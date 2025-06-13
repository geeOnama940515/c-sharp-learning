# 1. Base image with Node.js
FROM node:18-alpine AS base

WORKDIR /app
RUN apk add --no-cache libc6-compat

# 2. Dependencies layer
FROM base AS deps

COPY package.json package-lock.json ./
RUN npm ci

# 3. Build the Next.js app
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# 4. Production runtime image
FROM base AS runner

# Create app user
RUN addgroup --system --gid 1002 nodejs && \
    adduser --system --uid 1002 nextjs

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Copy only what's needed to run the app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

USER nextjs

EXPOSE 9056

CMD ["npm", "start"]
