'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Code, Search, Star, Trophy, ChevronRight, Play, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const topics = [
  // Basic Topics
  {
    id: 'variables-datatypes',
    title: 'Variables & Data Types',
    description: 'Learn about C# variables, primitive data types, and type conversion',
    category: 'Basic',
    difficulty: 1,
    duration: '30 min',
    completed: false,
    icon: '📝',
  },
  {
    id: 'operators',
    title: 'Operators',
    description: 'Arithmetic, logical, comparison, and assignment operators in C#',
    category: 'Basic',
    difficulty: 1,
    duration: '25 min',
    completed: false,
    icon: '🔢',
  },
  {
    id: 'control-structures',
    title: 'Control Structures',
    description: 'If-else statements, switch cases, and decision making',
    category: 'Basic',
    difficulty: 1,
    duration: '35 min',
    completed: false,
    icon: '🔀',
  },
  {
    id: 'loops',
    title: 'Loops',
    description: 'For, while, do-while, and foreach loops with practical examples',
    category: 'Basic',
    difficulty: 1,
    duration: '40 min',
    completed: false,
    icon: '🔁',
  },
  {
    id: 'arrays-collections',
    title: 'Arrays & Collections',
    description: 'Working with arrays, lists, dictionaries, and other collections',
    category: 'Basic',
    difficulty: 2,
    duration: '45 min',
    completed: false,
    icon: '📚',
  },
  
  // Intermediate Topics
  {
    id: 'classes-objects',
    title: 'Classes & Objects',
    description: 'Object-oriented programming fundamentals, constructors, and methods',
    category: 'Intermediate',
    difficulty: 2,
    duration: '60 min',
    completed: false,
    icon: '🏗️',
  },
  {
    id: 'inheritance',
    title: 'Inheritance',
    description: 'Class inheritance, base classes, and method overriding',
    category: 'Intermediate',
    difficulty: 2,
    duration: '50 min',
    completed: false,
    icon: '🌳',
  },
  {
    id: 'polymorphism',
    title: 'Polymorphism',
    description: 'Method overloading, overriding, and virtual methods',
    category: 'Intermediate',
    difficulty: 2,
    duration: '45 min',
    completed: false,
    icon: '🎭',
  },
  {
    id: 'interfaces',
    title: 'Interfaces',
    description: 'Defining and implementing interfaces for better code design',
    category: 'Intermediate',
    difficulty: 2,
    duration: '40 min',
    completed: false,
    icon: '🔌',
  },
  {
    id: 'exception-handling',
    title: 'Exception Handling',
    description: 'Try-catch blocks, custom exceptions, and error management',
    category: 'Intermediate',
    difficulty: 2,
    duration: '35 min',
    completed: false,
    icon: '⚠️',
  },
  
  // Advanced Topics
  {
    id: 'generics',
    title: 'Generics',
    description: 'Generic classes, methods, and constraints for type-safe code',
    category: 'Advanced',
    difficulty: 3,
    duration: '55 min',
    completed: false,
    icon: '🧬',
  },
  {
    id: 'linq',
    title: 'LINQ',
    description: 'Language Integrated Query for data manipulation and filtering',
    category: 'Advanced',
    difficulty: 3,
    duration: '65 min',
    completed: false,
    icon: '🔍',
  },
  {
    id: 'async-await',
    title: 'Async/Await',
    description: 'Asynchronous programming patterns and async methods',
    category: 'Advanced',
    difficulty: 3,
    duration: '70 min',
    completed: false,
    icon: '⚡',
  },
  {
    id: 'delegates-events',
    title: 'Delegates & Events',
    description: 'Function pointers, multicast delegates, and event handling',
    category: 'Advanced',
    difficulty: 3,
    duration: '60 min',
    completed: false,
    icon: '📡',
  },
  {
    id: 'reflection',
    title: 'Reflection',
    description: 'Runtime type inspection and dynamic code execution',
    category: 'Advanced',
    difficulty: 3,
    duration: '50 min',
    completed: false,
    icon: '🪞',
  },
];

const categories = ['All', 'Basic', 'Intermediate', 'Advanced'];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = topics.filter(topic => {
    const matchesCategory = selectedCategory === 'All' || topic.category === selectedCategory;
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const completedTopics = topics.filter(topic => topic.completed).length;
  const totalTopics = topics.length;

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'bg-green-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Basic': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  C# Learning Hub
                </h1>
                <p className="text-sm text-muted-foreground">Master C# from basics to advanced concepts</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-medium">{completedTopics}/{totalTopics} Topics</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => (
            <Card key={topic.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{topic.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight">{topic.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className={getCategoryColor(topic.category)}>
                          {topic.category}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < topic.difficulty ? getDifficultyColor(topic.difficulty) : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {topic.completed && (
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="mb-4 line-clamp-2">
                  {topic.description}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span>{topic.duration}</span>
                  </div>
                  <Link href={`/topic/${topic.id}`}>
                    <Button className="group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      <Play className="h-4 w-4 mr-2" />
                      Start
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTopics.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">No topics found matching your search.</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your search query or category filter.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">
            Built with ❤️ for C# learning • Start your programming journey today
          </p>
        </div>
      </footer>
    </div>
  );
}