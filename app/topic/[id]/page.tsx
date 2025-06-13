'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Code, 
  Copy, 
  CheckCircle, 
  PlayCircle,
  Lightbulb,
  Target,
  Clock,
  Star
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const topicData: { [key: string]: any } = {
  'variables-datatypes': {
    title: 'Variables & Data Types',
    description: 'Learn about C# variables, primitive data types, and type conversion',
    category: 'Basic',
    difficulty: 1,
    duration: '30 min',
    icon: '📝',
    overview: 'Variables are containers for storing data values. C# is a statically-typed language, which means you must declare the type of a variable before using it.',
    concepts: [
      'Variable declaration and initialization',
      'Primitive data types (int, string, bool, double, etc.)',
      'Type conversion and casting',
      'Constants and readonly variables',
      'Var keyword and type inference'
    ],
    codeExamples: [
      {
        title: 'Basic Variable Declaration',
        code: `// Integer variables
int age = 25;
int numberOfStudents = 30;

// String variables
string firstName = "John";
string lastName = "Doe";

// Boolean variables
bool isActive = true;
bool hasPermission = false;

// Double and decimal for numbers with decimals
double price = 99.99;
decimal salary = 50000.50m;

// Character variable
char grade = 'A';`,
        explanation: 'This example shows how to declare and initialize variables of different data types in C#.'
      },
      {
        title: 'Type Conversion',
        code: `// Implicit conversion (safe)
int num = 100;
double doubleNum = num; // int to double

// Explicit conversion (casting)
double pi = 3.14159;
int intPi = (int)pi; // 3 (loses decimal part)

// Using Convert class
string numberString = "123";
int convertedNumber = Convert.ToInt32(numberString);

// Using Parse method
string ageString = "25";
int parsedAge = int.Parse(ageString);

// Safe parsing with TryParse
string input = "abc";
bool success = int.TryParse(input, out int result);
if (success)
{
    Console.WriteLine($"Parsed value: {result}");
}
else
{
    Console.WriteLine("Invalid input");
}`,
        explanation: 'Different ways to convert between data types, including safe parsing methods.'
      }
    ],
    exercises: [
      {
        title: 'Variable Practice',
        description: 'Create variables to store a person\'s information and display them.',
        hint: 'Think about what data types would be appropriate for name, age, height, and student status.'
      }
    ],
    keyPoints: [
      'C# is statically typed - you must declare variable types',
      'Use meaningful variable names (camelCase convention)',
      'Initialize variables before using them',
      'Be careful with type conversions to avoid data loss',
      'Use TryParse for safe string-to-number conversions'
    ]
  },
  'operators': {
    title: 'Operators',
    description: 'Arithmetic, logical, comparison, and assignment operators in C#',
    category: 'Basic',
    difficulty: 1,
    duration: '25 min',
    icon: '🔢',
    overview: 'Operators are symbols that perform operations on variables and values. C# provides various types of operators for different purposes.',
    concepts: [
      'Arithmetic operators (+, -, *, /, %)',
      'Comparison operators (==, !=, <, >, <=, >=)',
      'Logical operators (&&, ||, !)',
      'Assignment operators (=, +=, -=, *=, /=)',
      'Increment and decrement operators (++, --)'
    ],
    codeExamples: [
      {
        title: 'Arithmetic Operators',
        code: `int a = 10;
int b = 3;

int addition = a + b;       // 13
int subtraction = a - b;    // 7
int multiplication = a * b; // 30
int division = a / b;       // 3 (integer division)
int remainder = a % b;      // 1 (modulus)

double preciseDiv = (double)a / b; // 3.333...`,
        explanation: 'Basic arithmetic operations in C#. Note integer division vs floating-point division.'
      }
    ],
    exercises: [
      {
        title: 'Calculator Practice',
        description: 'Create a simple calculator that performs basic arithmetic operations.',
        hint: 'Use different operators and handle division by zero.'
      }
    ],
    keyPoints: [
      'Integer division truncates decimal places',
      'Use parentheses to control operation order',
      'Modulus operator (%) gives remainder of division',
      'Increment/decrement can be prefix or postfix',
      'Logical operators use short-circuit evaluation'
    ]
  },
  'control-structures': {
    title: 'Control Structures',
    description: 'If-else statements, switch cases, and decision making',
    category: 'Basic',
    difficulty: 1,
    duration: '35 min',
    icon: '🔀',
    overview: 'Control structures allow you to control the flow of your program based on conditions. They are essential for making decisions in your code.',
    concepts: [
      'If-else statements',
      'Nested if statements',
      'Switch statements',
      'Ternary operator',
      'Logical operators (&&, ||, !)'
    ],
    codeExamples: [
      {
        title: 'If-Else Statements',
        code: `int score = 85;

// Simple if-else
if (score >= 90)
{
    Console.WriteLine("Grade: A");
}
else if (score >= 80)
{
    Console.WriteLine("Grade: B");
}
else if (score >= 70)
{
    Console.WriteLine("Grade: C");
}
else if (score >= 60)
{
    Console.WriteLine("Grade: D");
}
else
{
    Console.WriteLine("Grade: F");
}

// Using logical operators
int age = 20;
bool hasLicense = true;

if (age >= 18 && hasLicense)
{
    Console.WriteLine("Can drive");
}
else
{
    Console.WriteLine("Cannot drive");
}`,
        explanation: 'Basic conditional statements to make decisions based on different conditions.'
      },
      {
        title: 'Switch Statements',
        code: `string dayOfWeek = "Monday";

// Traditional switch statement
switch (dayOfWeek)
{
    case "Monday":
        Console.WriteLine("Start of work week");
        break;
    case "Tuesday":
    case "Wednesday":
    case "Thursday":
        Console.WriteLine("Midweek");
        break;
    case "Friday":
        Console.WriteLine("TGIF!");
        break;
    case "Saturday":
    case "Sunday":
        Console.WriteLine("Weekend!");
        break;
    default:
        Console.WriteLine("Invalid day");
        break;
}

// Modern switch expression (C# 8.0+)
string message = dayOfWeek switch
{
    "Monday" => "Start of work week",
    "Tuesday" or "Wednesday" or "Thursday" => "Midweek",
    "Friday" => "TGIF!",
    "Saturday" or "Sunday" => "Weekend!",
    _ => "Invalid day"
};

Console.WriteLine(message);`,
        explanation: 'Switch statements provide a clean way to handle multiple conditions, especially with the modern switch expression syntax.'
      }
    ],
    exercises: [
      {
        title: 'Grade Calculator',
        description: 'Create a program that takes a numeric score and outputs the corresponding letter grade.',
        hint: 'Use if-else statements to check score ranges.'
      }
    ],
    keyPoints: [
      'Use if-else for complex conditions and ranges',
      'Switch statements are ideal for exact value matching',
      'Always include a default case in switch statements',
      'Use logical operators to combine conditions',
      'Modern switch expressions are more concise and readable'
    ]
  },
  'loops': {
    title: 'Loops',
    description: 'For, while, do-while, and foreach loops with practical examples',
    category: 'Basic',
    difficulty: 1,
    duration: '40 min',
    icon: '🔁',
    overview: 'Loops allow you to execute a block of code repeatedly. C# provides several types of loops for different scenarios.',
    concepts: [
      'For loops for counting',
      'While loops for conditions',
      'Do-while loops (execute at least once)',
      'Foreach loops for collections',
      'Break and continue statements'
    ],
    codeExamples: [
      {
        title: 'Different Loop Types',
        code: `// For loop
for (int i = 0; i < 5; i++)
{
    Console.WriteLine($"Count: {i}");
}

// While loop
int count = 0;
while (count < 3)
{
    Console.WriteLine($"While count: {count}");
    count++;
}

// Do-while loop (executes at least once)
int number;
do
{
    Console.Write("Enter a positive number: ");
    number = int.Parse(Console.ReadLine());
} while (number <= 0);

// Foreach loop
string[] names = {"Alice", "Bob", "Charlie"};
foreach (string name in names)
{
    Console.WriteLine($"Hello, {name}!");
}`,
        explanation: 'Different types of loops for various scenarios in C# programming.'
      }
    ],
    exercises: [
      {
        title: 'Number Patterns',
        description: 'Create programs that print number patterns using different types of loops.',
        hint: 'Try creating a multiplication table or counting patterns.'
      }
    ],
    keyPoints: [
      'For loops are best for counting with known iterations',
      'While loops are ideal for condition-based repetition',
      'Do-while ensures at least one execution',
      'Foreach is perfect for iterating collections',
      'Use break to exit loops, continue to skip iterations'
    ]
  },
  'arrays-collections': {
    title: 'Arrays & Collections',
    description: 'Working with arrays, lists, dictionaries, and other collections',
    category: 'Basic',
    difficulty: 2,
    duration: '45 min',
    icon: '📚',
    overview: 'Collections allow you to store and manipulate groups of related data. C# provides various collection types for different needs.',
    concepts: [
      'Arrays (fixed size)',
      'Lists (dynamic arrays)',
      'Dictionaries (key-value pairs)',
      'HashSets (unique values)',
      'Collection methods and LINQ basics'
    ],
    codeExamples: [
      {
        title: 'Arrays and Lists',
        code: `// Arrays (fixed size)
int[] numbers = {1, 2, 3, 4, 5};
string[] names = new string[3] {"Alice", "Bob", "Charlie"};

// Accessing array elements
Console.WriteLine(numbers[0]); // 1
numbers[1] = 10; // Modify element

// Lists (dynamic size)
List<string> fruits = new List<string>();
fruits.Add("Apple");
fruits.Add("Banana");
fruits.Add("Orange");

// List methods
fruits.Remove("Banana");
bool hasApple = fruits.Contains("Apple");
int count = fruits.Count;

// Iterating through collections
foreach (int num in numbers)
{
    Console.WriteLine(num);
}

for (int i = 0; i < fruits.Count; i++)
{
    Console.WriteLine($"{i}: {fruits[i]}");
}`,
        explanation: 'Working with arrays and lists, the most common collection types in C#.'
      }
    ],
    exercises: [
      {
        title: 'Student Grade Manager',
        description: 'Create a program that stores student names and grades using collections.',
        hint: 'Consider using a Dictionary to map student names to their grades.'
      }
    ],
    keyPoints: [
      'Arrays have fixed size, Lists are dynamic',
      'Use List<T> for most collection needs',
      'Dictionaries provide fast key-based lookup',
      'Collections are zero-indexed',
      'Always check bounds when accessing elements'
    ]
  },
  'classes-objects': {
    title: 'Classes & Objects',
    description: 'Object-oriented programming fundamentals, constructors, and methods',
    category: 'Intermediate',
    difficulty: 2,
    duration: '60 min',
    icon: '🏗️',
    overview: 'Classes are blueprints for creating objects. They encapsulate data and behavior, forming the foundation of object-oriented programming.',
    concepts: [
      'Class definition and instantiation',
      'Fields and properties',
      'Constructors and destructors',
      'Methods and parameters',
      'Access modifiers (public, private, protected)'
    ],
    codeExamples: [
      {
        title: 'Basic Class Example',
        code: `public class Person
{
    // Fields (private by convention)
    private string name;
    private int age;
    
    // Properties (public access to private fields)
    public string Name 
    { 
        get { return name; } 
        set { name = value; } 
    }
    
    public int Age 
    { 
        get { return age; } 
        set { age = value >= 0 ? value : 0; } 
    }
    
    // Constructor
    public Person(string name, int age)
    {
        this.Name = name;
        this.Age = age;
    }
    
    // Methods
    public void Introduce()
    {
        Console.WriteLine($"Hi, I'm {Name} and I'm {Age} years old.");
    }
    
    public bool IsAdult()
    {
        return Age >= 18;
    }
}

// Using the class
Person person = new Person("Alice", 25);
person.Introduce();
Console.WriteLine($"Is adult: {person.IsAdult()}");`,
        explanation: 'A complete class example showing fields, properties, constructors, and methods.'
      }
    ],
    exercises: [
      {
        title: 'Bank Account Class',
        description: 'Create a BankAccount class with deposit, withdraw, and balance checking methods.',
        hint: 'Include validation to prevent negative balances and invalid operations.'
      }
    ],
    keyPoints: [
      'Classes define the structure, objects are instances',
      'Use properties instead of public fields',
      'Constructors initialize object state',
      'Methods define object behavior',
      'Access modifiers control visibility'
    ]
  }
};

export default function TopicPage() {
  const params = useParams();
  const topicId = params.id as string;
  const [currentSection, setCurrentSection] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  const topic = topicData[topicId];

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Topic Not Found</h1>
          <Link href="/">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Topics
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

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
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Topics
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
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
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Topic Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-4xl">{topic.icon}</div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {topic.title}
              </h1>
              <p className="text-lg text-muted-foreground mt-1">{topic.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{topic.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>{topic.concepts.length} concepts</span>
            </div>
            <div className="flex items-center space-x-2">
              <Code className="h-4 w-4" />
              <span>{topic.codeExamples.length} examples</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="examples" className="flex items-center space-x-2">
              <Code className="h-4 w-4" />
              <span>Examples</span>
            </TabsTrigger>
            <TabsTrigger value="exercises" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Exercises</span>
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Summary</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  <span>What You'll Learn</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{topic.overview}</p>
                <Separator className="my-4" />
                <h4 className="font-semibold mb-3">Key Concepts:</h4>
                <ul className="space-y-2">
                  {topic.concepts.map((concept: string, index: number) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{concept}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            {topic.codeExamples.map((example: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{example.title}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(example.code, `example-${index}`)}
                    >
                      {copiedCode === `example-${index}` ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 rounded-lg p-4 mb-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                  <p className="text-muted-foreground">{example.explanation}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="exercises" className="space-y-6">
            {topic.exercises.map((exercise: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    <span>{exercise.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{exercise.description}</p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <strong>Hint:</strong> {exercise.hint}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="summary" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>Key Takeaways</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {topic.keyPoints.map((point: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-green-800 dark:text-green-300 mb-1">
                      Ready for the next topic?
                    </h3>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Complete this topic and continue your C# learning journey!
                    </p>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Complete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-8 border-t">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous Topic
          </Button>
          <Button>
            Next Topic
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
}