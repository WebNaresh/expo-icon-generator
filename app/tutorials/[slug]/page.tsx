import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  BookOpen,
  CheckCircle,
  Play,
} from "lucide-react";

interface Tutorial {
  slug: string;
  title: string;
  description: string;
  content: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  category: string;
  topics: string[];
  rating: number;
  students: number;
  chapters: Chapter[];
}

interface Chapter {
  id: string;
  title: string;
  duration: string;
  completed?: boolean;
}

const getTutorial = async (slug: string): Promise<Tutorial | null> => {
  const tutorials: Record<string, Tutorial> = {
    "expo-app-development-complete-guide": {
      slug: "expo-app-development-complete-guide",
      title: "Complete Expo App Development Guide",
      description:
        "Build your first React Native app with Expo from scratch. Learn navigation, state management, API integration, and deployment to app stores.",
      difficulty: "Beginner",
      duration: "4 hours",
      category: "Development",
      topics: [
        "Expo",
        "React Native",
        "Navigation",
        "State Management",
        "Deployment",
      ],
      rating: 4.9,
      students: 12500,
      chapters: [
        {
          id: "1",
          title: "Setting Up Your Development Environment",
          duration: "20 min",
        },
        { id: "2", title: "Creating Your First Expo App", duration: "30 min" },
        {
          id: "3",
          title: "Understanding React Native Components",
          duration: "45 min",
        },
        {
          id: "4",
          title: "Navigation with React Navigation",
          duration: "40 min",
        },
        {
          id: "5",
          title: "State Management with Context API",
          duration: "35 min",
        },
        {
          id: "6",
          title: "API Integration and Data Fetching",
          duration: "50 min",
        },
        { id: "7", title: "Building the User Interface", duration: "60 min" },
        { id: "8", title: "Testing Your Application", duration: "25 min" },
        {
          id: "9",
          title: "Building and Deploying to App Stores",
          duration: "35 min",
        },
      ],
      content: `
# Complete Expo App Development Guide

Welcome to the most comprehensive guide for building React Native applications with Expo. This tutorial will take you from zero to publishing your first app on both iOS and Android app stores.

## What You'll Learn

By the end of this tutorial, you'll have:
- ✅ Built a complete React Native app using Expo
- ✅ Implemented navigation between screens
- ✅ Managed application state effectively
- ✅ Integrated with external APIs
- ✅ Created a polished user interface
- ✅ Deployed your app to app stores

## Prerequisites

Before starting this tutorial, you should have:
- Basic knowledge of JavaScript and React
- Node.js installed on your computer
- A smartphone for testing (iOS or Android)
- Basic understanding of mobile app concepts

## Chapter 1: Setting Up Your Development Environment

### Installing Required Tools

First, let's set up everything you need for Expo development:

\`\`\`bash
# Install Node.js (if not already installed)
# Download from https://nodejs.org/

# Install Expo CLI globally
npm install -g @expo/cli

# Verify installation
expo --version
\`\`\`

### Setting Up Your Mobile Device

1. **Install Expo Go App**
   - iOS: Download from App Store
   - Android: Download from Google Play Store

2. **Create Expo Account**
   - Sign up at https://expo.dev
   - This will be used for building and publishing

### Development Environment Options

You have several options for development:

1. **Local Development** (Recommended)
   - Full control over your environment
   - Faster development cycle
   - Works offline

2. **Expo Snack** (Web-based)
   - No setup required
   - Great for quick prototypes
   - Limited functionality

## Chapter 2: Creating Your First Expo App

### Project Initialization

Let's create your first Expo project:

\`\`\`bash
# Create a new Expo project
npx create-expo-app MyFirstApp

# Navigate to project directory
cd MyFirstApp

# Start the development server
npx expo start
\`\`\`

### Project Structure Overview

Understanding the project structure is crucial:

\`\`\`
MyFirstApp/
├── App.js                 # Main application component
├── app.json              # Expo configuration
├── package.json          # Dependencies and scripts
├── assets/               # Images, fonts, and other assets
│   ├── icon.png         # App icon
│   └── splash.png       # Splash screen
└── node_modules/         # Installed packages
\`\`\`

### Your First Component

Let's modify the default App.js to understand the basics:

\`\`\`javascript
import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Welcome to My First App!</Text>
      <Text style={styles.subtitle}>
        This is built with Expo and React Native
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
\`\`\`

## Chapter 3: Understanding React Native Components

### Core Components

React Native provides several built-in components:

#### View Component
The building block for UI layout:

\`\`\`javascript
import { View } from 'react-native';

<View style={{ flex: 1, padding: 20 }}>
  {/* Other components go here */}
</View>
\`\`\`

#### Text Component
For displaying text content:

\`\`\`javascript
import { Text } from 'react-native';

<Text style={{ fontSize: 18, color: 'blue' }}>
  Hello, World!
</Text>
\`\`\`

#### TouchableOpacity
For handling user interactions:

\`\`\`javascript
import { TouchableOpacity, Text } from 'react-native';

<TouchableOpacity 
  style={styles.button}
  onPress={() => alert('Button pressed!')}
>
  <Text style={styles.buttonText}>Press Me</Text>
</TouchableOpacity>
\`\`\`

### Styling in React Native

React Native uses a subset of CSS properties:

\`\`\`javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,                    // Takes full available space
    flexDirection: 'column',    // Layout direction
    justifyContent: 'center',   // Main axis alignment
    alignItems: 'center',       // Cross axis alignment
    backgroundColor: '#f0f0f0', // Background color
    padding: 20,                // Internal spacing
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
\`\`\`

## Chapter 4: Navigation with React Navigation

### Installing React Navigation

\`\`\`bash
npm install @react-navigation/native @react-navigation/stack

# Install required dependencies
npx expo install react-native-screens react-native-safe-area-context
\`\`\`

### Setting Up Navigation

Create a basic navigation structure:

\`\`\`javascript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'My App' }}
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen}
          options={{ title: 'Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
\`\`\`

### Creating Screen Components

\`\`\`javascript
// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
\`\`\`

## Chapter 5: State Management with Context API

### Understanding State in React Native

State management is crucial for building interactive apps. We'll use React's Context API for global state management.

### Creating a Context

\`\`\`javascript
// context/AppContext.js
import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  user: null,
  theme: 'light',
  notifications: [],
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case 'ADD_NOTIFICATION':
      return { 
        ...state, 
        notifications: [...state.notifications, action.payload] 
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
\`\`\`

## Best Practices and Tips

### Performance Optimization
- Use FlatList for large lists
- Implement lazy loading for images
- Minimize re-renders with React.memo
- Use native driver for animations

### Code Organization
- Separate components into different files
- Use consistent naming conventions
- Implement proper error handling
- Write meaningful comments

### Testing Strategy
- Unit tests for utility functions
- Component tests with React Native Testing Library
- End-to-end tests with Detox
- Manual testing on real devices

## Next Steps

After completing this tutorial, consider:
1. **Advanced Navigation**: Tab navigation, drawer navigation
2. **State Management**: Redux, Zustand, or MobX
3. **Backend Integration**: Firebase, Supabase, or custom APIs
4. **Performance**: Profiling and optimization techniques
5. **Publishing**: App store optimization and marketing

## Conclusion

Congratulations! You've learned the fundamentals of Expo app development. This foundation will serve you well as you build more complex applications.

Remember to:
- Practice regularly by building small projects
- Stay updated with React Native and Expo releases
- Join the community for support and learning
- Contribute to open source projects

Ready to build your next app? Start with our [Icon Generator](/) to create perfect icons for your project!
      `,
    },
  };

  return tutorials[slug] || null;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = await getTutorial(slug);

  if (!tutorial) {
    return {
      title: "Tutorial Not Found",
    };
  }

  return {
    title: `${tutorial.title} | Expo Icon Generator Tutorials`,
    description: tutorial.description,
    keywords: tutorial.topics,
    openGraph: {
      title: tutorial.title,
      description: tutorial.description,
      type: "article",
    },
  };
}

export default async function TutorialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tutorial = await getTutorial(slug);

  if (!tutorial) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Back Navigation */}
        <Link
          href="/tutorials"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tutorials
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tutorial Header */}
            <header className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    tutorial.difficulty === "Beginner"
                      ? "bg-green-100 text-green-700"
                      : tutorial.difficulty === "Intermediate"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {tutorial.difficulty}
                </span>
                <span className="text-gray-500 text-sm">
                  {tutorial.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {tutorial.title}
              </h1>

              <p className="text-lg text-gray-600 mb-6">
                {tutorial.description}
              </p>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{tutorial.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{tutorial.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>{tutorial.rating} rating</span>
                </div>
              </div>
            </header>

            {/* Tutorial Content */}
            <article className="prose prose-lg max-w-none">
              <div
                className="leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: tutorial.content
                    .replace(/\n/g, "<br />")
                    .replace(/#{1,6}\s/g, (match) => {
                      const level = match.trim().length;
                      return `<h${level} class="text-${
                        4 - level
                      }xl font-bold text-gray-900 mt-8 mb-4">`;
                    })
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                    .replace(
                      /`([^`]+)`/g,
                      '<code class="bg-gray-100 px-2 py-1 rounded text-sm">$1</code>'
                    ),
                }}
              />
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Course Progress */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Course Content
                </h3>
                <div className="space-y-3">
                  {tutorial.chapters.map((chapter, index) => (
                    <div
                      key={chapter.id}
                      className="flex items-center gap-3 p-3 bg-white rounded-lg"
                    >
                      <div className="flex-shrink-0">
                        {chapter.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Play className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {index + 1}. {chapter.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {chapter.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topics Covered */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Topics Covered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tutorial.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Ready to Start?</h3>
                <p className="text-sm mb-4 opacity-90">
                  Begin this tutorial and start building amazing apps today.
                </p>
                <button className="w-full bg-white text-purple-600 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Start Tutorial
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
