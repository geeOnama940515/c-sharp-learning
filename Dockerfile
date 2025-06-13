# 1. Base image with Node.js
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install required dependencies for building native modules (if any)
RUN apk add --no-cache libc6-compat

# 2. Install dependencies
FROM base AS deps

# Copy only the package files to install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# 3. Build the application
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Build the app
RUN npm run build

# 4. Prepare production image
FROM base AS runner

# Create app user
RUN addgroup --system --gid 1002 nodejs && \
    adduser --system --uid 1002 nextjs

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

USER nextjs

EXPOSE 9056

# Start the Next.js app
CMD ["npm", "start"]
