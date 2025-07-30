import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock, Users, Star, ArrowRight, Code, Smartphone, Palette } from "lucide-react";

export const metadata: Metadata = {
  title: "Tutorials - Learn App Development & Icon Design",
  description: "Step-by-step tutorials for mobile app development, icon design, and Expo React Native. From beginner to advanced, learn with practical examples and real-world projects.",
  keywords: [
    "app development tutorials",
    "react native tutorials",
    "expo tutorials",
    "icon design tutorials",
    "mobile development",
    "app store optimization",
    "ui ux design",
    "mobile app icons"
  ],
  openGraph: {
    title: "Tutorials - Learn App Development & Icon Design",
    description: "Comprehensive tutorials for mobile app development and icon design",
    type: "website",
  },
};

interface Tutorial {
  slug: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  category: string;
  topics: string[];
  rating: number;
  students: number;
  featured: boolean;
}

const tutorials: Tutorial[] = [
  {
    slug: "expo-app-development-complete-guide",
    title: "Complete Expo App Development Guide",
    description: "Build your first React Native app with Expo from scratch. Learn navigation, state management, API integration, and deployment to app stores.",
    difficulty: "Beginner",
    duration: "4 hours",
    category: "Development",
    topics: ["Expo", "React Native", "Navigation", "State Management", "Deployment"],
    rating: 4.9,
    students: 12500,
    featured: true
  },
  {
    slug: "professional-icon-design-masterclass",
    title: "Professional Icon Design Masterclass",
    description: "Master the art of creating stunning app icons. Learn design principles, color theory, typography, and platform-specific guidelines.",
    difficulty: "Intermediate",
    duration: "3 hours",
    category: "Design",
    topics: ["Icon Design", "Color Theory", "Typography", "Branding", "Platform Guidelines"],
    rating: 4.8,
    students: 8900,
    featured: true
  },
  {
    slug: "react-native-performance-optimization",
    title: "React Native Performance Optimization",
    description: "Advanced techniques for optimizing React Native apps. Learn about bundle size reduction, memory management, and rendering optimization.",
    difficulty: "Advanced",
    duration: "5 hours",
    category: "Performance",
    topics: ["Performance", "Optimization", "Bundle Size", "Memory Management", "Profiling"],
    rating: 4.7,
    students: 5600,
    featured: true
  },
  {
    slug: "app-store-submission-guide",
    title: "App Store Submission Complete Guide",
    description: "Navigate the app store submission process for both iOS and Android. Learn about requirements, optimization, and approval strategies.",
    difficulty: "Intermediate",
    duration: "2.5 hours",
    category: "Publishing",
    topics: ["App Store", "Google Play", "Submission", "ASO", "Guidelines"],
    rating: 4.6,
    students: 7200,
    featured: false
  },
  {
    slug: "adaptive-icons-android-tutorial",
    title: "Android Adaptive Icons Deep Dive",
    description: "Master Android's adaptive icon system. Learn about foreground/background layers, dynamic theming, and backward compatibility.",
    difficulty: "Intermediate",
    duration: "1.5 hours",
    category: "Design",
    topics: ["Android", "Adaptive Icons", "Material Design", "Theming"],
    rating: 4.5,
    students: 4300,
    featured: false
  },
  {
    slug: "expo-eas-build-deployment",
    title: "EAS Build and Deployment Workflow",
    description: "Set up automated build and deployment pipelines using Expo Application Services. Learn CI/CD best practices for mobile apps.",
    difficulty: "Advanced",
    duration: "3.5 hours",
    category: "DevOps",
    topics: ["EAS Build", "CI/CD", "Deployment", "Automation", "Testing"],
    rating: 4.8,
    students: 3100,
    featured: false
  }
];

const categories = ["All", "Development", "Design", "Performance", "Publishing", "DevOps"];
const difficulties = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function TutorialsPage() {
  const featuredTutorials = tutorials.filter(tutorial => tutorial.featured);
  const allTutorials = tutorials.filter(tutorial => !tutorial.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Learn App Development
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Master mobile app development and icon design with our comprehensive tutorials. 
            From beginner-friendly guides to advanced optimization techniques.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-500" />
              <span className="font-medium">50+ Tutorials</span>
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="font-medium">25,000+ Students</span>
            </span>
            <span className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-medium">4.8 Average Rating</span>
            </span>
          </div>
        </div>

        {/* Featured Tutorials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Tutorials</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredTutorials.map((tutorial) => (
              <article key={tutorial.slug} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      tutorial.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                      tutorial.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {tutorial.difficulty}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{tutorial.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-purple-600 transition-colors">
                    <Link href={`/tutorials/${tutorial.slug}`}>
                      {tutorial.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {tutorial.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tutorial.topics.slice(0, 3).map((topic) => (
                      <span key={topic} className="px-2 py-1 bg-purple-50 text-purple-600 rounded text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {tutorial.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {tutorial.students.toLocaleString()} students
                    </span>
                  </div>
                  
                  <Link 
                    href={`/tutorials/${tutorial.slug}`}
                    className="flex items-center justify-center gap-2 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Start Learning
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Learning Paths */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Learning Paths</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">App Development</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Learn React Native and Expo from basics to advanced concepts. Build real-world applications.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li>• React Native Fundamentals</li>
                <li>• Expo CLI and Tools</li>
                <li>• Navigation and State Management</li>
                <li>• API Integration</li>
                <li>• App Store Deployment</li>
              </ul>
              <Link 
                href="/tutorials?category=Development"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View Path →
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Palette className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Icon Design</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Master the art of creating beautiful, functional icons for mobile applications.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li>• Design Principles</li>
                <li>• Color Theory and Typography</li>
                <li>• Platform Guidelines</li>
                <li>• Adaptive Icons</li>
                <li>• Brand Consistency</li>
              </ul>
              <Link 
                href="/tutorials?category=Design"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                View Path →
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Smartphone className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">App Publishing</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Learn how to successfully publish and optimize your apps in app stores.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li>• App Store Guidelines</li>
                <li>• Submission Process</li>
                <li>• App Store Optimization</li>
                <li>• Marketing Strategies</li>
                <li>• Analytics and Monitoring</li>
              </ul>
              <Link 
                href="/tutorials?category=Publishing"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                View Path →
              </Link>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-colors text-sm"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Difficulty</h3>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-colors text-sm"
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* All Tutorials */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">All Tutorials</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {allTutorials.map((tutorial) => (
              <article key={tutorial.slug} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    tutorial.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                    tutorial.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {tutorial.difficulty}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm">{tutorial.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-purple-600 transition-colors">
                  <Link href={`/tutorials/${tutorial.slug}`}>
                    {tutorial.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 text-sm mb-3">
                  {tutorial.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>{tutorial.duration}</span>
                  <span>{tutorial.students.toLocaleString()} students</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {tutorial.topics.slice(0, 2).map((topic) => (
                      <span key={topic} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>
                  <Link 
                    href={`/tutorials/${tutorial.slug}`}
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                  >
                    Start →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Build Amazing Apps?
          </h3>
          <p className="mb-6 max-w-2xl mx-auto">
            Start with our beginner-friendly tutorials and work your way up to advanced topics. 
            Join thousands of developers who have successfully launched their apps.
          </p>
          <Link 
            href="/tutorials/expo-app-development-complete-guide"
            className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Start Your Journey
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
