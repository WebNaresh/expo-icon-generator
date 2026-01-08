export interface Chapter {
    id: string;
    title: string;
    duration: string;
    completed?: boolean;
}

export interface Tutorial {
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
    featured: boolean;
}

export const tutorials: Tutorial[] = [
    {
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
        featured: true,
        chapters: [
            {
                id: "1",
                title: "Setting Up Your Development Environment",
                duration: "20 min",
            },
            { id: "2", title: "Creating Your First Expo App", duration: "30 min" },
            { id: "3", title: "Understanding React Native Components", duration: "45 min" },
            { id: "4", title: "Navigation with React Navigation", duration: "40 min" },
            { id: "5", title: "State Management with Context API", duration: "35 min" },
            { id: "6", title: "API Integration and Data Fetching", duration: "50 min" },
            { id: "7", title: "Building the User Interface", duration: "60 min" },
            { id: "8", title: "Testing Your Application", duration: "25 min" },
            { id: "9", title: "Building and Deploying to App Stores", duration: "35 min" },
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

## Chapter 3: Understanding React Native Components

React Native provides several built-in components like \`View\`, \`Text\`, and \`TouchableOpacity\`. These map directly to native UI elements on iOS and Android.

(Continue through chapters as outlined in the curriculum...)

## Conclusion

Congratulations! You've learned the fundamentals of Expo app development. This foundation will serve you well as you build more complex applications.
    `,
    },
    {
        slug: "professional-icon-design-masterclass",
        title: "Professional Icon Design Masterclass",
        description:
            "Master the art of creating stunning app icons. Learn design principles, color theory, typography, and platform-specific guidelines.",
        difficulty: "Intermediate",
        duration: "3 hours",
        category: "Design",
        topics: [
            "Icon Design",
            "Color Theory",
            "Typography",
            "Branding",
            "Platform Guidelines",
        ],
        rating: 4.8,
        students: 8900,
        featured: true,
        chapters: [
            { id: "1", title: "Introduction to Icon Design", duration: "15 min" },
            { id: "2", title: "Design Principles and Theory", duration: "30 min" },
            { id: "3", title: "Color Theory for Icons", duration: "25 min" },
            { id: "4", title: "Typography in Icon Design", duration: "20 min" },
            { id: "5", title: "Platform-Specific Guidelines", duration: "40 min" },
            { id: "6", title: "Creating Your First Icon", duration: "45 min" },
            { id: "7", title: "Advanced Design Techniques", duration: "35 min" },
            { id: "8", title: "Testing and Optimization", duration: "20 min" },
        ],
        content: `
# Professional Icon Design Masterclass

Welcome to the comprehensive masterclass on professional icon design. This course will transform you from a beginner to a skilled icon designer capable of creating stunning, effective app icons.

## What You'll Master

- ✅ Apply fundamental design principles
- ✅ Use color theory effectively
- ✅ Create icons that work across all platforms
- ✅ Understand platform-specific guidelines

## Chapter 1: Introduction to Icon Design

Icons are the visual language of digital interfaces. They communicate complex ideas instantly and help users navigate applications intuitively.

## Chapter 2: Design Principles

Simplicity is key. The best icons are simple, memorable, and recognizable at any size, from 16x16 to 1024x1024.

(Course content continues...)
    `,
    },
    {
        slug: "react-native-performance-optimization",
        title: "React Native Performance Optimization",
        description:
            "Advanced techniques for optimizing React Native apps. Learn about bundle size reduction, memory management, and rendering optimization.",
        difficulty: "Advanced",
        duration: "5 hours",
        category: "Performance",
        topics: [
            "Performance",
            "Optimization",
            "Bundle Size",
            "Memory Management",
            "Profiling",
        ],
        rating: 4.7,
        students: 5600,
        featured: true,
        chapters: [
            { id: "1", title: "Performance Fundamentals", duration: "30 min" },
            { id: "2", title: "Bundle Size Optimization", duration: "45 min" },
            { id: "3", title: "Memory Management", duration: "40 min" },
            { id: "4", title: "Rendering Optimization", duration: "50 min" },
            { id: "5", title: "Navigation Performance", duration: "35 min" },
            { id: "6", title: "Image and Asset Optimization", duration: "40 min" },
            { id: "7", title: "Profiling and Debugging", duration: "45 min" },
            { id: "8", title: "Production Optimization", duration: "35 min" },
        ],
        content: `
# React Native Performance Optimization

Master advanced techniques to build lightning-fast React Native applications. This comprehensive guide covers everything from bundle optimization to memory management.

## Chapter 1: Performance Fundamentals

Understanding the React Native bridge and how the JS thread communicates with the Native thread is essential for performance.

## Chapter 2: Bundle Size Optimization

Large bundles mean slow startup times. Learn how to analyze your bundle and remove unnecessary dependencies.

(Course content continues...)
    `,
    },
    {
        slug: "app-store-submission-guide",
        title: "App Store Submission Complete Guide",
        description:
            "Navigate the app store submission process for both iOS and Android. Learn about requirements, optimization, and approval strategies.",
        difficulty: "Intermediate",
        duration: "2.5 hours",
        category: "Publishing",
        topics: ["App Store", "Google Play", "Submission", "ASO", "Guidelines"],
        rating: 4.6,
        students: 7200,
        featured: false,
        chapters: [
            { id: "1", title: "Pre-submission Checklist", duration: "30 min" },
            { id: "2", title: "Creating Developer Accounts", duration: "20 min" },
            { id: "3", title: "iOS App Store Connect", duration: "45 min" },
            { id: "4", title: "Google Play Console", duration: "45 min" },
            { id: "5", title: "Handling Rejections", duration: "30 min" },
        ],
        content: `
# App Store Submission Complete Guide

Getting your app built is half the battle. Getting it into the hands of users is the other half. This guide walks you through the maze of app store submission.

## Chapter 1: Pre-submission Checklist

Before you even log in to App Store Connect, ensure you have:
- Valid screenshots for all device sizes
- Privacy Policy URL
- Support URL
- Final binary build (IPA/AAB)

## Chapter 2: Developer Accounts

You need an Apple Developer Program membership ($99/year) and a Google Play Console account ($25 one-time fee).

## Chapter 3: iOS App Store Connect

Learn how to create a new app record, upload your build via Transporter or Xcode, and fill out the required metadata.

## Chapter 4: Google Play Console

Navigating the Google Play Console tracks (Internal, Closed Alpha, Open Beta, Production) and managing releases.

## Conclusion

Submission can be daunting, but with a checklist and patience, you will get your app published!
    `,
    },
    {
        slug: "adaptive-icons-android-tutorial",
        title: "Android Adaptive Icons Deep Dive",
        description:
            "Master Android's adaptive icon system. Learn about foreground/background layers, dynamic theming, and backward compatibility.",
        difficulty: "Intermediate",
        duration: "1.5 hours",
        category: "Design",
        topics: ["Android", "Adaptive Icons", "Material Design", "Theming"],
        rating: 4.5,
        students: 4300,
        featured: false,
        chapters: [
            { id: "1", title: "What are Adaptive Icons?", duration: "15 min" },
            { id: "2", title: "Foreground & Background Layers", duration: "30 min" },
            { id: "3", title: "Safe Zones and Masking", duration: "20 min" },
            { id: "4", title: "Testing with Android Studio", duration: "25 min" },
        ],
        content: `
# Android Adaptive Icons Deep Dive

Since Android 8.0 (Oreo), adaptive icons have been the standard. They can display a variety of shapes across different device models.

## Chapter 1: What are Adaptive Icons?

Adaptive icons allow the launcher to display the app icon in a circular, square, or squircle shape, depending on the user's theme or device manufacturer preference.

## Chapter 2: Layers

An adaptive icon is made of two layers:
1.  **Foreground**: The logo or symbol (108x108dp).
2.  **Background**: A solid color or pattern (108x108dp).

## Chapter 3: Safe Zones

The system masks the icon. You must keep critical visual elements within the center 66dp circle to ensure they are never cropped out.

## Chapter 4: Testing

Use the "Image Asset Studio" inside Android Studio to preview how your layers interact with different masks.
    `,
    },
    {
        slug: "expo-eas-build-deployment",
        title: "EAS Build and Deployment Workflow",
        description:
            "Set up automated build and deployment pipelines using Expo Application Services. Learn CI/CD best practices for mobile apps.",
        difficulty: "Advanced",
        duration: "3.5 hours",
        category: "DevOps",
        topics: ["EAS Build", "CI/CD", "Deployment", "Automation", "Testing"],
        rating: 4.8,
        students: 3100,
        featured: false,
        chapters: [
            { id: "1", title: "Introduction to EAS", duration: "20 min" },
            { id: "2", title: "Configuring eas.json", duration: "40 min" },
            { id: "3", title: "Managing Credentials", duration: "30 min" },
            { id: "4", title: "EAS Submit", duration: "30 min" },
            { id: "5", title: "Automating with GitHub Actions", duration: "45 min" },
        ],
        content: `
# EAS Build and Deployment Workflow

Expo Application Services (EAS) is the next generation of Expo's cloud services. It allows you to build binary apps in the cloud for both Expo Go and bare React Native projects.

## Chapter 1: Introduction to EAS

EAS Build replaces the classic \`expo build\`. It runs a full native build process in the cloud, giving you more control and support for custom native code.

## Chapter 2: Configuring eas.json

The \`eas.json\` file controls your build profiles (development, preview, production).

\`\`\`json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      },
      "ios": {
        "simulator": true
      }
    },
    "production": {}
  }
}
\`\`\`

## Chapter 3: Managing Credentials

EAS handles signing certificates and provisioning profiles for you, or you can upload your own.

## Chapter 4: EAS Submit

Automatically submit your built binaries to the Apple App Store and Google Play Store with a single command: \`eas submit\`.
    `,
    },
];
