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
    "professional-icon-design-masterclass": {
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

By completing this masterclass, you'll be able to:
- ✅ Apply fundamental design principles to icon creation
- ✅ Use color theory effectively in your designs
- ✅ Create icons that work across all platforms
- ✅ Understand and implement platform-specific guidelines
- ✅ Design icons that enhance user experience
- ✅ Optimize icons for different sizes and contexts

## Chapter 1: Introduction to Icon Design

### The Role of Icons in Digital Design

Icons are the visual language of digital interfaces. They communicate complex ideas instantly and help users navigate applications intuitively. A well-designed icon can:

- **Improve usability** by providing visual cues
- **Enhance brand recognition** through consistent design
- **Reduce cognitive load** by replacing text with symbols
- **Create emotional connections** with users

### Icon Design Fundamentals

#### Simplicity is Key
The best icons are simple, memorable, and instantly recognizable. They should work at any size, from 16×16 pixels to 1024×1024 pixels.

#### Universal Understanding
Great icons transcend language barriers and cultural differences. They use universally understood symbols and metaphors.

## Chapter 2: Design Principles and Theory

### The Five Principles of Icon Design

#### 1. Clarity
Your icon should be immediately understandable. Users should know what it represents within milliseconds of seeing it.

#### 2. Consistency
Maintain consistent style, weight, and visual treatment across all icons in a set.

#### 3. Scalability
Icons must work at all sizes. Test your designs at the smallest size they'll be used.

#### 4. Distinctiveness
Each icon should be unique and easily distinguishable from others in the same context.

#### 5. Functionality
Icons should enhance the user experience, not complicate it.

### Visual Hierarchy

Understanding visual hierarchy helps create icons that guide user attention effectively:

- **Size**: Larger elements draw more attention
- **Color**: Bright, contrasting colors stand out
- **Position**: Elements in the upper-left get noticed first
- **Contrast**: High contrast creates emphasis

## Chapter 3: Color Theory for Icons

### Understanding Color Psychology

Colors evoke emotions and associations:

- **Red**: Energy, urgency, passion
- **Blue**: Trust, stability, professionalism
- **Green**: Growth, nature, success
- **Yellow**: Optimism, creativity, attention
- **Purple**: Luxury, creativity, mystery
- **Orange**: Enthusiasm, warmth, caution

### Color Harmony in Icon Design

#### Monochromatic Schemes
Using different shades of the same color creates harmony and sophistication.

#### Complementary Colors
Colors opposite on the color wheel create high contrast and visual impact.

#### Analogous Colors
Adjacent colors on the color wheel create pleasing, harmonious designs.

### Accessibility Considerations

- Ensure sufficient contrast ratios (minimum 3:1 for icons)
- Don't rely solely on color to convey information
- Test with color blindness simulators
- Consider how icons appear in dark mode

## Chapter 4: Platform-Specific Guidelines

### iOS Design Guidelines

Apple's Human Interface Guidelines emphasize:

- **Clarity**: Icons should be immediately recognizable
- **Deference**: Icons support content, not overshadow it
- **Depth**: Subtle use of layers and shadows

#### iOS Icon Specifications
- Use the full 1024×1024px canvas
- Avoid transparency
- Create depth with gradients and shadows
- Test at 29×29px (smallest size)

### Android Material Design

Google's Material Design principles focus on:

- **Material metaphor**: Icons should feel tactile and real
- **Bold, graphic, intentional**: Use strong visual elements
- **Motion provides meaning**: Consider how icons animate

#### Android Adaptive Icons
- Foreground layer: 108×108dp with 66×66dp safe zone
- Background layer: Solid color or simple pattern
- System applies various masks

### Web Design Considerations

- SVG format for scalability
- Consistent stroke width
- Optimized for small sizes
- Fast loading times

## Chapter 5: Creating Your First Icon

### Design Process Overview

1. **Research and Inspiration**
2. **Sketching and Ideation**
3. **Digital Creation**
4. **Testing and Refinement**
5. **Final Optimization**

### Tools and Software

#### Professional Tools
- **Adobe Illustrator**: Industry standard for vector graphics
- **Sketch**: Mac-only, popular for UI design
- **Figma**: Collaborative, web-based design tool

#### Free Alternatives
- **Inkscape**: Open-source vector graphics editor
- **GIMP**: Free raster graphics editor
- **Canva**: User-friendly with templates

### Step-by-Step Icon Creation

#### Step 1: Define the Concept
- What does the icon represent?
- Who is the target audience?
- Where will it be used?

#### Step 2: Sketch Ideas
- Start with pencil and paper
- Explore multiple concepts
- Focus on simple, recognizable shapes

#### Step 3: Create Digital Versions
- Use vector graphics for scalability
- Start with basic shapes
- Refine and add details

#### Step 4: Test at Different Sizes
- Export at various sizes
- Check legibility at smallest size
- Adjust details as needed

## Chapter 6: Advanced Design Techniques

### Creating Depth and Dimension

#### Gradients
- Subtle gradients add depth
- Avoid overly complex gradients
- Maintain consistency across icon sets

#### Shadows and Highlights
- Use sparingly for emphasis
- Maintain consistent light source
- Consider the platform's design language

### Icon Families and Systems

#### Maintaining Consistency
- Establish style guidelines
- Use consistent stroke weights
- Maintain similar proportions
- Apply uniform corner radius

#### Creating Variations
- Outline vs. filled versions
- Different weights (light, regular, bold)
- Seasonal or themed variations

### Animation Considerations

#### Micro-interactions
- Subtle hover effects
- Loading animations
- State change transitions

#### Performance
- Keep file sizes small
- Use CSS animations when possible
- Consider battery impact on mobile

## Chapter 7: Testing and Optimization

### User Testing Methods

#### A/B Testing
- Test different icon designs
- Measure user comprehension
- Analyze click-through rates

#### Focus Groups
- Gather qualitative feedback
- Understand user associations
- Identify cultural considerations

### Technical Optimization

#### File Size Optimization
- Remove unnecessary elements
- Optimize SVG code
- Use appropriate compression

#### Cross-Platform Testing
- Test on different devices
- Verify appearance in various contexts
- Check accessibility compliance

### Quality Assurance Checklist

- [ ] Works at all required sizes
- [ ] Maintains clarity when scaled
- [ ] Follows platform guidelines
- [ ] Passes accessibility tests
- [ ] Consistent with brand identity
- [ ] Optimized file size
- [ ] Cross-browser compatible

## Conclusion

Icon design is both an art and a science. It requires creativity, technical skill, and deep understanding of user behavior. The principles and techniques covered in this masterclass will help you create icons that are not only beautiful but also functional and effective.

### Key Takeaways

1. **Simplicity wins**: The best icons are simple and memorable
2. **Context matters**: Consider where and how icons will be used
3. **Test early and often**: User feedback is invaluable
4. **Stay consistent**: Maintain style across icon families
5. **Keep learning**: Design trends and technologies evolve

### Next Steps

1. Practice with personal projects
2. Study successful icon designs
3. Join design communities
4. Build a portfolio of your work
5. Stay updated with platform guidelines

Ready to create stunning icons? Use our [Icon Generator](/) to bring your designs to life!
      `,
    },
    "react-native-performance-optimization": {
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

## What You'll Learn

- ✅ Identify and fix performance bottlenecks
- ✅ Optimize bundle size and startup time
- ✅ Implement efficient memory management
- ✅ Master rendering optimization techniques
- ✅ Use profiling tools effectively
- ✅ Apply production-ready optimizations

## Chapter 1: Performance Fundamentals

### Understanding React Native Performance

React Native performance depends on three main threads:
- **JavaScript Thread**: Runs your app logic
- **Main Thread**: Handles UI rendering and user interactions
- **Shadow Thread**: Calculates layout

### Common Performance Issues

1. **JavaScript Thread Blocking**: Heavy computations blocking the JS thread
2. **Bridge Communication**: Excessive data transfer between JS and native
3. **Memory Leaks**: Unreleased objects causing memory growth
4. **Inefficient Rendering**: Unnecessary re-renders and large component trees

### Performance Metrics to Track

- **Time to Interactive (TTI)**: How quickly users can interact
- **Bundle Size**: JavaScript bundle size affects startup time
- **Memory Usage**: RAM consumption over time
- **Frame Rate**: Smooth 60 FPS for optimal UX

## Chapter 2: Bundle Size Optimization

### Analyzing Bundle Size

Use Metro Bundle Analyzer to understand your bundle composition:

\`\`\`bash
npx react-native-bundle-visualizer
\`\`\`

### Tree Shaking and Dead Code Elimination

#### Import Only What You Need
\`\`\`javascript
// ❌ Bad: Imports entire library
import _ from 'lodash';

// ✅ Good: Import specific functions
import { debounce } from 'lodash';
\`\`\`

#### Use Babel Plugins
\`\`\`json
{
  "plugins": [
    ["import", {
      "libraryName": "lodash",
      "libraryDirectory": "",
      "camel2DashComponentName": false
    }, "lodash"]
  ]
}
\`\`\`

### Code Splitting Strategies

#### Dynamic Imports
\`\`\`javascript
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
\`\`\`

#### Route-Based Splitting
\`\`\`javascript
const HomeScreen = React.lazy(() => import('./screens/HomeScreen'));
const ProfileScreen = React.lazy(() => import('./screens/ProfileScreen'));
\`\`\`

## Chapter 3: Memory Management

### Identifying Memory Leaks

#### Common Causes
- Event listeners not removed
- Timers not cleared
- Circular references
- Large objects in closures

#### Memory Leak Prevention
\`\`\`javascript
useEffect(() => {
  const subscription = EventEmitter.addListener('event', handler);
  const timer = setInterval(updateData, 1000);

  return () => {
    subscription.remove();
    clearInterval(timer);
  };
}, []);
\`\`\`

### Efficient Data Structures

#### Use Immutable Updates
\`\`\`javascript
// ❌ Bad: Mutating state
state.items.push(newItem);

// ✅ Good: Immutable update
setState(prevState => ({
  ...prevState,
  items: [...prevState.items, newItem]
}));
\`\`\`

#### Optimize Large Lists
\`\`\`javascript
import { FlatList } from 'react-native';

<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={item => item.id}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={10}
/>
\`\`\`

## Chapter 4: Rendering Optimization

### React.memo and useMemo

#### Prevent Unnecessary Re-renders
\`\`\`javascript
const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => expensiveOperation(item));
  }, [data]);

  return <View>{/* Render processed data */}</View>;
});
\`\`\`

### useCallback for Event Handlers

\`\`\`javascript
const ListItem = React.memo(({ item, onPress }) => {
  const handlePress = useCallback(() => {
    onPress(item.id);
  }, [item.id, onPress]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );
});
\`\`\`

### Virtualization for Large Lists

\`\`\`javascript
import { VirtualizedList } from 'react-native';

<VirtualizedList
  data={largeDataSet}
  initialNumToRender={4}
  renderItem={({ item }) => <Item item={item} />}
  keyExtractor={item => item.id}
  getItemCount={() => largeDataSet.length}
  getItem={(data, index) => data[index]}
/>
\`\`\`

## Chapter 5: Navigation Performance

### Optimize Screen Transitions

#### Lazy Loading Screens
\`\`\`javascript
const LazyScreen = () => {
  const Component = React.lazy(() => import('./HeavyScreen'));

  return (
    <Suspense fallback={<ScreenLoader />}>
      <Component />
    </Suspense>
  );
};
\`\`\`

#### Preload Critical Screens
\`\`\`javascript
// Preload next screen during idle time
const preloadScreen = () => {
  import('./NextScreen');
};

useEffect(() => {
  const timer = setTimeout(preloadScreen, 2000);
  return () => clearTimeout(timer);
}, []);
\`\`\`

### Stack Navigator Optimization

\`\`\`javascript
<Stack.Navigator
  screenOptions={{
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  }}
  initialRouteName="Home"
>
  <Stack.Screen
    name="Home"
    component={HomeScreen}
    options={{ lazy: false }} // Preload important screens
  />
</Stack.Navigator>
\`\`\`

## Chapter 6: Image and Asset Optimization

### Image Optimization Strategies

#### Use Appropriate Formats
- **WebP**: Best compression for photos
- **PNG**: For images with transparency
- **SVG**: For simple graphics and icons

#### Implement Progressive Loading
\`\`\`javascript
const OptimizedImage = ({ source, placeholder }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <View>
      {!loaded && <Image source={placeholder} />}
      <Image
        source={source}
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </View>
  );
};
\`\`\`

### Asset Bundling Best Practices

#### Use require() for Static Assets
\`\`\`javascript
// ❌ Bad: Dynamic require
const imageName = 'logo';
const image = require(\`./images/\${imageName}.png\`);

// ✅ Good: Static require
const image = require('./images/logo.png');
\`\`\`

## Chapter 7: Profiling and Debugging

### React DevTools Profiler

1. Install React DevTools
2. Enable profiling in your app
3. Record performance sessions
4. Analyze component render times

### Flipper Performance Tools

#### Memory Profiler
- Track memory usage over time
- Identify memory leaks
- Analyze heap snapshots

#### Network Inspector
- Monitor API calls
- Optimize request/response sizes
- Identify slow endpoints

### Custom Performance Monitoring

\`\`\`javascript
const performanceMonitor = {
  startTimer: (name) => {
    console.time(name);
  },

  endTimer: (name) => {
    console.timeEnd(name);
  },

  measureRender: (componentName) => {
    return (WrappedComponent) => {
      return (props) => {
        performanceMonitor.startTimer(\`\${componentName} render\`);

        useEffect(() => {
          performanceMonitor.endTimer(\`\${componentName} render\`);
        });

        return <WrappedComponent {...props} />;
      };
    };
  }
};
\`\`\`

## Chapter 8: Production Optimization

### Build Optimization

#### Enable Hermes Engine
\`\`\`javascript
// android/app/build.gradle
project.ext.react = [
  enableHermes: true
]
\`\`\`

#### Optimize Metro Configuration
\`\`\`javascript
// metro.config.js
module.exports = {
  transformer: {
    minifierConfig: {
      keep_fnames: true,
      mangle: {
        keep_fnames: true,
      },
    },
  },
};
\`\`\`

### Runtime Performance

#### Implement Error Boundaries
\`\`\`javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
\`\`\`

### Monitoring and Analytics

#### Performance Metrics Collection
\`\`\`javascript
import { Performance } from 'react-native-performance';

// Track app startup time
Performance.mark('app-start');
Performance.mark('app-interactive');
Performance.measure('startup-time', 'app-start', 'app-interactive');
\`\`\`

## Best Practices Summary

1. **Profile First**: Always measure before optimizing
2. **Optimize Gradually**: Make incremental improvements
3. **Test on Real Devices**: Emulators don't reflect real performance
4. **Monitor Production**: Use crash reporting and performance monitoring
5. **Keep Dependencies Updated**: Newer versions often include performance improvements

## Conclusion

Performance optimization is an ongoing process. Start with the biggest impact optimizations and gradually refine your app's performance. Remember to always measure the impact of your changes and test on real devices.

Ready to optimize your app's icons? Use our [Icon Generator](/) for perfectly optimized app icons!
      `,
    },
    "app-store-submission-guide": {
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
      chapters: [
        { id: "1", title: "Pre-Submission Checklist", duration: "20 min" },
        { id: "2", title: "iOS App Store Submission", duration: "30 min" },
        { id: "3", title: "Google Play Store Submission", duration: "25 min" },
        { id: "4", title: "App Store Optimization", duration: "35 min" },
        { id: "5", title: "Review Process and Guidelines", duration: "25 min" },
        { id: "6", title: "Handling Rejections", duration: "15 min" },
        { id: "7", title: "Post-Launch Strategy", duration: "20 min" },
      ],
      content: `
# App Store Submission Complete Guide

Master the app store submission process for both iOS and Android platforms. This comprehensive guide covers everything from preparation to post-launch optimization.

## What You'll Learn

- ✅ Prepare your app for store submission
- ✅ Navigate iOS App Store Connect
- ✅ Submit to Google Play Console
- ✅ Optimize for app store discovery
- ✅ Handle review processes and rejections
- ✅ Implement post-launch strategies

## Chapter 1: Pre-Submission Checklist

### Essential Requirements

Before submitting to any app store, ensure your app meets these fundamental requirements:

#### Functionality Requirements
- App launches without crashes
- All features work as intended
- No broken links or missing content
- Proper error handling and user feedback

#### Content Requirements
- Original content or proper licensing
- No copyrighted material without permission
- Age-appropriate content
- Clear privacy policy

#### Technical Requirements
- Optimized performance on target devices
- Proper memory management
- Battery usage optimization
- Network connectivity handling

### App Store Assets Preparation

#### Icons and Screenshots
- App icon in all required sizes
- Screenshots for all supported device types
- Optional: App preview videos

#### Metadata
- App name and subtitle
- Description and keywords
- Category selection
- Age rating information

## Chapter 2: iOS App Store Submission

### Setting Up App Store Connect

#### Developer Account Requirements
1. Apple Developer Program membership ($99/year)
2. Verified developer identity
3. Tax and banking information

#### Creating Your App Record
\`\`\`
1. Log into App Store Connect
2. Click "My Apps" → "+" → "New App"
3. Fill in app information:
   - Platform: iOS
   - Name: Your app name
   - Primary Language: Your app's main language
   - Bundle ID: Must match your Xcode project
   - SKU: Unique identifier for your app
\`\`\`

### App Information Setup

#### App Details
- **Name**: 30 characters max, must be unique
- **Subtitle**: 30 characters, appears below app name
- **Category**: Primary and optional secondary category

#### Pricing and Availability
- **Price Tier**: Free or paid pricing
- **Availability**: Countries and regions
- **Release Date**: Automatic or scheduled release

#### App Privacy
- **Privacy Policy URL**: Required for all apps
- **Privacy Practices**: Data collection disclosure

### Build Upload Process

#### Using Xcode
\`\`\`bash
# Archive your app
1. Product → Archive in Xcode
2. Select your archive
3. Click "Distribute App"
4. Choose "App Store Connect"
5. Upload and wait for processing
\`\`\`

#### Using Application Loader
\`\`\`bash
# Alternative upload method
1. Export IPA from Xcode
2. Open Application Loader
3. Select your IPA file
4. Upload to App Store Connect
\`\`\`

### App Review Information

#### Review Notes
Provide clear instructions for reviewers:
- Test account credentials (if required)
- Special configuration steps
- Feature explanations
- Contact information

#### Demo Account Setup
If your app requires login:
- Create a demo account
- Ensure it has access to all features
- Provide clear credentials
- Keep account active during review

## Chapter 3: Google Play Store Submission

### Google Play Console Setup

#### Developer Account
1. Google Play Developer account ($25 one-time fee)
2. Identity verification
3. Developer distribution agreement

#### Creating Your App
\`\`\`
1. Open Google Play Console
2. Click "Create app"
3. Fill in app details:
   - App name
   - Default language
   - App or game designation
   - Free or paid status
\`\`\`

### App Bundle Preparation

#### Android App Bundle (AAB)
\`\`\`bash
# Generate signed AAB
./gradlew bundleRelease

# Or using Android Studio
Build → Generate Signed Bundle/APK → Android App Bundle
\`\`\`

#### Upload Process
1. Navigate to "App releases"
2. Choose release track (Internal, Alpha, Beta, Production)
3. Upload your AAB file
4. Complete release notes

### Store Listing Optimization

#### App Details
- **Title**: 50 characters max
- **Short description**: 80 characters
- **Full description**: 4000 characters max

#### Graphics Assets
- **App icon**: 512×512 PNG
- **Feature graphic**: 1024×500 PNG
- **Screenshots**: Various sizes for different devices
- **Promo video**: YouTube URL (optional)

### Content Rating

#### IARC Questionnaire
Complete the International Age Rating Coalition questionnaire:
- Content descriptors
- Interactive elements
- Target age group
- Regional ratings

## Chapter 4: App Store Optimization (ASO)

### Keyword Research

#### iOS App Store Keywords
- **Keyword field**: 100 characters, comma-separated
- **App name**: Include primary keyword
- **Subtitle**: Secondary keywords

#### Google Play Store Keywords
- **Title**: Include primary keyword naturally
- **Description**: Use keywords throughout
- **No separate keyword field**

### Optimization Strategies

#### Title Optimization
\`\`\`
Examples:
❌ Bad: "MyApp"
✅ Good: "MyApp - Photo Editor & Filters"
\`\`\`

#### Description Best Practices
1. **Hook**: Compelling first line
2. **Features**: Bullet points of key features
3. **Benefits**: How it helps users
4. **Keywords**: Natural integration
5. **Call to Action**: Encourage downloads

#### Visual Optimization
- **Icon A/B Testing**: Test different designs
- **Screenshot Optimization**: Show key features
- **Localization**: Adapt for different markets

### Conversion Rate Optimization

#### Metrics to Track
- **Impression to Store Page**: Keyword effectiveness
- **Store Page to Install**: Conversion optimization
- **Install to Active User**: Onboarding effectiveness

#### Testing Strategies
- A/B test app icons
- Test different screenshots
- Experiment with descriptions
- Try various keywords

## Chapter 5: Review Process and Guidelines

### iOS Review Guidelines

#### Common Rejection Reasons
1. **Crashes and Bugs**: App doesn't work properly
2. **Missing Information**: Incomplete metadata
3. **Design Issues**: Poor user interface
4. **Content Issues**: Inappropriate content
5. **Legal Issues**: Copyright violations

#### Review Timeline
- **Standard Review**: 24-48 hours
- **Expedited Review**: 2-7 days (limited uses)
- **Appeal Process**: If rejected unfairly

### Google Play Review Process

#### Automated Review
- **Pre-launch Report**: Automated testing
- **Policy Compliance**: Automated checks
- **Security Scanning**: Malware detection

#### Manual Review
- **Content Review**: Human reviewers
- **Policy Violations**: Manual assessment
- **Appeal Process**: Request human review

### Best Practices for Approval

#### Testing Checklist
- [ ] Test on multiple devices
- [ ] Verify all features work
- [ ] Check for crashes
- [ ] Test network connectivity issues
- [ ] Validate user flows

#### Compliance Checklist
- [ ] Follow platform design guidelines
- [ ] Respect user privacy
- [ ] Provide clear app functionality
- [ ] Include proper legal information
- [ ] Ensure content appropriateness

## Chapter 6: Handling Rejections

### Common Rejection Scenarios

#### Technical Rejections
- **App Crashes**: Fix stability issues
- **Performance Issues**: Optimize app performance
- **Incomplete Features**: Ensure all features work

#### Policy Rejections
- **Content Violations**: Review content guidelines
- **Privacy Issues**: Update privacy practices
- **Misleading Information**: Correct app description

### Rejection Response Strategy

#### Immediate Actions
1. **Read Rejection Carefully**: Understand specific issues
2. **Fix Identified Problems**: Address all mentioned issues
3. **Test Thoroughly**: Verify fixes work properly
4. **Resubmit Promptly**: Don't delay resubmission

#### Communication with Reviewers
- **Be Professional**: Maintain respectful tone
- **Provide Clarification**: Explain complex features
- **Include Evidence**: Screenshots or videos if helpful
- **Request Clarification**: If rejection reason unclear

## Chapter 7: Post-Launch Strategy

### Launch Day Activities

#### Monitoring
- **Crash Reports**: Monitor for stability issues
- **User Reviews**: Respond to feedback
- **Download Metrics**: Track initial performance
- **Server Load**: Ensure backend can handle traffic

#### Marketing
- **Social Media**: Announce launch
- **Press Release**: Contact relevant media
- **Influencer Outreach**: Reach out to relevant influencers
- **Community Engagement**: Engage with users

### Ongoing Optimization

#### Regular Updates
- **Bug Fixes**: Address reported issues
- **Feature Improvements**: Based on user feedback
- **Performance Optimization**: Continuous improvement
- **Security Updates**: Keep app secure

#### ASO Maintenance
- **Keyword Optimization**: Adjust based on performance
- **Visual Updates**: Refresh screenshots and icons
- **Description Updates**: Improve conversion rates
- **Localization**: Expand to new markets

### Analytics and Monitoring

#### Key Metrics
- **Downloads**: Track acquisition
- **Active Users**: Monitor engagement
- **Retention Rates**: Measure user satisfaction
- **Revenue**: Track monetization

#### Tools and Platforms
- **App Store Connect Analytics**: iOS metrics
- **Google Play Console**: Android metrics
- **Third-party Analytics**: Firebase, Mixpanel, etc.
- **Crash Reporting**: Crashlytics, Bugsnag

## Best Practices Summary

1. **Prepare Thoroughly**: Complete all requirements before submission
2. **Follow Guidelines**: Adhere to platform-specific rules
3. **Test Extensively**: Ensure quality before submission
4. **Optimize for Discovery**: Implement ASO best practices
5. **Monitor and Iterate**: Continuously improve post-launch

## Conclusion

Successful app store submission requires careful preparation, attention to detail, and ongoing optimization. By following this guide, you'll be well-equipped to navigate both iOS and Android submission processes successfully.

Ready to submit your app? Make sure you have perfect icons with our [Icon Generator](/)!
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
