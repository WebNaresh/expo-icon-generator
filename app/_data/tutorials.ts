interface Chapter {
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

Welcome to this practical guide for building React Native applications with Expo. This tutorial covers everything from environment setup to publishing your app on iOS and Android.

## Prerequisites

- Basic knowledge of JavaScript and React
- Node.js (v18 or newer) installed
- A smartphone or emulator for testing

## Chapter 1: Setting Up Your Development Environment

Install the Expo CLI and the Expo Go app on your phone. Expo Go lets you preview your app instantly without a full native build.

\`\`\`bash
# Install the Expo CLI
npm install -g @expo/cli

# Verify installation
npx expo --version
\`\`\`

Install the **Expo Go** app from the App Store or Google Play. You'll use it to scan a QR code and run your app on your real device during development.

## Chapter 2: Creating Your First Expo App

Expo provides a project template that sets up TypeScript, file-based routing, and a working home screen.

\`\`\`bash
npx create-expo-app MyFirstApp --template

cd MyFirstApp
npx expo start
\`\`\`

This starts a development server. Scan the QR code in Expo Go, and your app opens on your phone. Every time you save a file, the app refreshes automatically via Fast Refresh.

**Project structure:**
\`\`\`
app/              ← Expo Router screens (file-based routing)
  _layout.tsx     ← Root layout
  index.tsx       ← Home screen
assets/           ← Icons, fonts, images
components/       ← Reusable UI components
\`\`\`

## Chapter 3: React Native Core Components

React Native has its own set of components — you cannot use HTML elements like \`<div>\` or \`<p>\`. The most common ones:

| Component | Equivalent | Use for |
|-----------|-----------|---------|
| \`View\` | \`<div>\` | Containers, layout |
| \`Text\` | \`<p>\`, \`<span>\` | All text |
| \`Image\` | \`<img>\` | Images |
| \`ScrollView\` | overflow scroll | Scrollable content |
| \`FlatList\` | virtualized list | Long lists (performant) |
| \`TextInput\` | \`<input>\` | Text entry |
| \`Pressable\` | \`<button>\` | Tappable areas |

All styling is done with the \`StyleSheet\` API (JavaScript objects), not CSS files.

\`\`\`tsx
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, Expo!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});
\`\`\`

## Chapter 4: Navigation with Expo Router

Expo Router uses file-based routing — the file path becomes the URL. No manual route registration needed.

\`\`\`
app/
  index.tsx         → "/" (home screen)
  profile.tsx       → "/profile"
  settings/
    index.tsx       → "/settings"
    account.tsx     → "/settings/account"
  (tabs)/
    _layout.tsx     ← tab navigator layout
    home.tsx        → "/home" tab
    explore.tsx     → "/explore" tab
\`\`\`

Navigate programmatically with the \`router\` object:

\`\`\`tsx
import { router } from 'expo-router';

// Push a new screen
router.push('/contributors');

// Replace current screen (no back)
router.replace('/');

// Go back
router.back();
\`\`\`

Pass parameters via the URL:
\`\`\`tsx
router.push('/contributors/username');
// In app/contributors/[username].tsx, read it with useLocalSearchParams()
\`\`\`

## Chapter 5: State Management with Context API

For small-to-medium apps, React's built-in Context API is sufficient. Create a context file, wrap your layout, and consume it in any screen.

\`\`\`tsx
// context/AppContext.tsx
import { createContext, useContext, useState } from 'react';

const AppContext = createContext({ user: null, setUser: (_: any) => {} });

function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>;
}

const useApp = () => useContext(AppContext);
\`\`\`

Wrap your root layout in \`app/_layout.tsx\`:
\`\`\`tsx
import { AppProvider } from '../context/AppContext';
export default function RootLayout() {
  return <AppProvider><Stack /></AppProvider>;
}
\`\`\`

## Chapter 6: API Integration

Use the native \`fetch\` API or a library like \`axios\`. Always handle loading and error states.

\`\`\`tsx
import { useEffect, useState } from 'react';

function useData(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
\`\`\`

For POST requests with JSON:
\`\`\`tsx
const res = await fetch('https://api.example.com/items', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'New item' }),
});
const result = await res.json();
\`\`\`

## Chapter 7: Building the User Interface

Use \`StyleSheet.create\` for performance — it validates styles at development time and optimises them on the native side.

**Layout with Flexbox:**

React Native uses flexbox by default. Key differences from web:
- \`flexDirection\` defaults to \`'column'\` (not \`'row'\`)
- There is no \`display: block/inline\` — everything is flex
- \`flex: 1\` fills available space (like \`flex-grow: 1\`)

\`\`\`tsx
const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  card: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
  },
});
\`\`\`

## Chapter 8: Testing Your Application

Expo supports Jest for unit tests and Detox for end-to-end tests. For basic component testing:

\`\`\`bash
npx create-expo-app MyApp --template  # already includes Jest config
bun test
\`\`\`

Test a component:
\`\`\`tsx
import { render, screen } from '@testing-library/react-native';
import HomeScreen from '../app/index';

test('renders welcome text', () => {
  render(<HomeScreen />);
  expect(screen.getByText('Hello, Expo!')).toBeTruthy();
});
\`\`\`

Always test on real devices before submitting. Simulators don't reproduce all native behaviours (camera, push notifications, biometrics).

## Chapter 9: Building and Deploying to App Stores

Use **EAS Build** (Expo Application Services) to create production binaries in the cloud.

\`\`\`bash
# Install EAS CLI
npm install -g eas-cli

# Log in and configure
eas login
eas build:configure

# Build for both platforms
eas build --platform all

# Submit to stores
eas submit --platform ios
eas submit --platform android
\`\`\`

Before submitting, ensure your \`app.json\` has:
- \`version\` and \`buildNumber\` (iOS) / \`versionCode\` (Android)
- All required icons and splash screens (generate them with our [Expo Assets Generator](https://expo-assets-generator.vercel.app))
- A valid \`bundleIdentifier\` (iOS) and \`package\` (Android)

## Conclusion

You now have a working knowledge of every major piece of an Expo app: setup, routing, components, state, API calls, UI, testing, and deployment. The best next step is to build a small real project — the experience of shipping something is worth more than reading more tutorials.
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

This guide covers the fundamentals of app icon design for iOS and Android, including design principles, platform requirements, and common mistakes to avoid.

## Chapter 1: Why Icon Design Matters

Your app icon is the first thing users see before downloading. It appears in search results, the home screen, App Store listings, notification trays, and Settings. A poorly designed icon signals low quality before the app is even opened.

Good icons share three traits:
- **Readable at every size** — from 29×29px (iOS Settings) to 1024×1024px (App Store)
- **Distinctive at a glance** — recognisable when surrounded by other icons on a home screen
- **Consistent with the app** — colour and style should match the in-app experience

## Chapter 2: Design Principles

**Simplicity wins.** Remove everything that doesn't need to be there. An icon with five elements becomes unreadable at 60px. Reduce to one or two.

**Use shape, not detail.** At small sizes, the silhouette is what registers — fine gradients and shadows disappear. Design for the outline first.

**Test at real sizes.** Design at 1024×1024, but screenshot it at 60×60 and view it on your actual phone. This reveals problems that look fine on a large canvas.

**Contrast matters.** High contrast between foreground and background keeps the icon legible on both light and dark wallpapers. Avoid light grey on white or dark green on black.

## Chapter 3: Color Theory for Icons

**Limit your palette.** Two to three colours is almost always enough. More colours increase visual noise and make icons look cluttered at small sizes.

**Consider the competition.** Look at the top 10 apps in your category on the App Store. If they all use blue, a red or green icon stands out immediately.

**Warm vs. cool:** Warm colours (red, orange, yellow) draw attention and feel energetic. Cool colours (blue, green, purple) feel calm and trustworthy. Match the tone to your app's purpose — a meditation app benefits from cool tones; a food delivery app benefits from warm ones.

**Check accessibility:** Avoid relying on colour alone to communicate meaning. Colour-blind users (roughly 8% of men) may not distinguish red from green.

## Chapter 4: Typography in Icon Design

Avoid text in icons when possible. Short text (1–3 letters) can work, but it must:
- Be legible at the smallest size your icon appears (29×29px on iOS)
- Use a bold, simple typeface — thin strokes disappear
- Be set in a contrasting colour against the background

If your brand name is short (e.g., "N", "fb"), a monogram icon can work well. If it's long, use a symbol instead.

**Never use thin fonts.** A thin stroke that looks elegant at 1024px becomes invisible at 29px.

## Chapter 5: Platform-Specific Guidelines

### iOS Requirements
- PNG format, no transparency (iOS applies its own rounded corners)
- 1024×1024px for App Store Connect
- No text that says "New", "Free", or includes Apple hardware images
- Apple applies corner radius automatically — do not pre-round your icon

### Android Requirements
- Adaptive icons: two separate layers (foreground + background), each 1024×1024px
- Keep critical visual elements inside the centre 66dp "safe zone" — the system applies masks (circle, squircle, rounded square) that can crop the edges
- For Android 7 and below (legacy): a standalone 512×512px PNG

### Expo Configuration
\`\`\`json
{
  "expo": {
    "icon": "./assets/icon.png",
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    }
  }
}
\`\`\`

Use our [Expo Assets Generator](https://expo-assets-generator.vercel.app) to create both from a single source image automatically.

## Chapter 6: Creating Your Icon — Practical Workflow

1. **Start with a concept sketch.** Spend 10 minutes with pen and paper before opening any design tool.
2. **Design at 1024×1024px** in Figma, Sketch, or Illustrator.
3. **Export at multiple sizes** (1024, 512, 192, 60, 29) and check readability at each.
4. **Put it on a real home screen.** Screenshot your design and set it as a widget or use a mockup tool to see it alongside real apps.
5. **Show it to someone unfamiliar with your app.** Ask: "What do you think this app does?" If they can't guess roughly correctly, simplify.

## Chapter 7: Advanced Techniques

**Depth without detail:** A subtle drop shadow or inner glow can suggest depth without adding visual complexity. Keep it understated — it should be invisible at 60px.

**Negative space:** Clever use of negative space can make an icon memorable. The FedEx arrow and the Amazon smile are classic examples. For app icons, a recognisable shape formed by negative space is often more distinctive than a detailed illustration.

**Consistency across app and icon:** If your app uses blue as its primary colour, your icon should too. Users expect the icon colour to roughly predict the in-app experience.

## Chapter 8: Testing and Optimisation

Before submitting to any store:

- [ ] View the icon at 29×29, 60×60, 120×120, and 1024×1024
- [ ] Place it on both a light and a dark wallpaper
- [ ] Check it against the top 5 competing apps in the store
- [ ] Run the PNG through a compressor (pngquant or TinyPNG) — store images should be as small as possible
- [ ] Test the adaptive icon on Android with different launcher masks (circle, rounded square, squircle) using Android Studio's Image Asset Studio

A well-tested icon reduces store rejection risk and increases download rates by making a strong first impression.
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

This guide covers practical techniques for making React Native apps faster — from reducing bundle size to eliminating unnecessary re-renders.

## Chapter 1: How React Native Executes Code

React Native runs JavaScript on a separate thread and communicates with the native UI thread via a bridge (or via JSI in the new architecture). Heavy work on the JS thread blocks the bridge and causes dropped frames.

**Two threads to care about:**
- **JS Thread:** Your React code, state updates, and business logic
- **UI Thread:** Native rendering, animations, gestures

If you see janky animations or slow touches, the JS thread is likely overloaded during those moments.

**Check your current FPS** using the in-app developer menu → "Perf Monitor." You want 60fps during animations.

## Chapter 2: Bundle Size Optimization

Startup time is mostly determined by how long it takes to parse and execute your JavaScript bundle.

**Find what's large:**
\`\`\`bash
npx expo export --dump-sourcemap
npx source-map-explorer dist/bundles/index.ios.js
\`\`\`

Common bundle bloat sources:
- Importing an entire library when you only need one function (e.g., lodash)
- Unused icons from icon packs
- Large locale files in date/number libraries

**Use tree-shaking friendly imports:**
\`\`\`ts
// Bad — imports entire lodash (~70kb)
import _ from 'lodash';
const result = _.pick(obj, 'id', 'name');

// Good — imports only pick (~1kb)
import pick from 'lodash/pick';
\`\`\`

**Lazy-load heavy screens:**
\`\`\`tsx
import { lazy, Suspense } from 'react';
const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<ActivityIndicator />}>
      <HeavyChart />
    </Suspense>
  );
}
\`\`\`

## Chapter 3: Memory Management

React Native does not garbage-collect native resources automatically when a component unmounts. You must clean up manually.

**Always unsubscribe from listeners:**
\`\`\`tsx
useEffect(() => {
  const subscription = AppState.addEventListener('change', handleChange);
  return () => subscription.remove(); // cleanup
}, []);
\`\`\`

**Avoid storing large objects in state.** Keep state minimal — only what the UI needs to render. Put large data in refs, a cache, or an external store.

**Large lists:** Never use \`ScrollView\` for lists with more than ~20 items. Use \`FlatList\` instead — it only renders items visible on screen.

\`\`\`tsx
<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <ItemCard item={item} />}
  removeClippedSubviews  // unmounts off-screen items
  maxToRenderPerBatch={10}
  windowSize={5}
/>
\`\`\`

## Chapter 4: Rendering Optimisation

Every call to \`setState\` triggers a re-render. Unnecessary re-renders are the most common React Native performance problem.

**Memoize components that receive stable props:**
\`\`\`tsx
const ItemCard = React.memo(({ item }: { item: Item }) => {
  return <View><Text>{item.title}</Text></View>;
});
\`\`\`

**Memoize expensive calculations:**
\`\`\`tsx
const sortedItems = useMemo(
  () => [...items].sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);
\`\`\`

**Stabilise callback references:**
\`\`\`tsx
const handlePress = useCallback(() => {
  doSomething(id);
}, [id]); // only recreated when id changes
\`\`\`

**Profile before optimising.** Use React DevTools Profiler (run in Hermes mode) to find which components re-render most. Only optimise the hot path.

## Chapter 5: Navigation Performance

Expo Router (and React Navigation under the hood) keeps all mounted screens in memory. This is intentional — it makes back-navigation instant — but it means screens rendered off-screen still run effects.

**Avoid heavy work in \`useEffect\` on non-focused screens:**
\`\`\`tsx
import { useFocusEffect } from 'expo-router';

useFocusEffect(
  useCallback(() => {
    startPolling();
    return () => stopPolling(); // cleanup when leaving
  }, [])
);
\`\`\`

**Defer data loading until the screen is visible** using \`useFocusEffect\` or React Navigation's \`useIsFocused\` hook instead of a plain \`useEffect\`.

## Chapter 6: Image and Asset Optimisation

Images are the single largest category of memory usage in most apps.

**Always specify dimensions.** Without explicit width/height, React Native must decode the image to measure it, causing layout jumps.

**Use the right format:**
- PNG for icons and logos (lossless, transparency support)
- JPEG for photos (smaller file size)
- WebP for the best compression on Android (native support since Android 4.0)

**Resize images before bundling.** A 4000×3000 photo displayed at 200×150 wastes ~15× the memory needed. Resize at the source.

**Cache network images** with \`expo-image\` (a drop-in replacement for \`<Image>\` with better caching):

\`\`\`tsx
import { Image } from 'expo-image';
<Image source={{ uri: 'https://...' }} contentFit="cover" style={{ width: 200, height: 200 }} />
\`\`\`

For app icons and splash screens, use our [Expo Assets Generator](https://expo-assets-generator.vercel.app) to produce correctly-sized assets for every platform automatically.

## Chapter 7: Profiling and Debugging

**Hermes profiler (recommended):**
1. Enable Hermes in \`app.json\`: \`"jsEngine": "hermes"\`
2. Shake device → "Enable Sampling Profiler"
3. Reproduce the slow interaction
4. Stop profiling and open the trace in Chrome DevTools (\`chrome://tracing\`)

**Flipper:** Connect Flipper to your running Metro server for real-time network inspection, layout inspection, and crash logs on device.

**React DevTools:** Run \`npx react-devtools\` and connect your Expo app for component tree inspection and re-render highlighting.

## Chapter 8: Production Optimisation

**Enable Hermes** (default in Expo SDK 48+). It pre-compiles JS to bytecode, reducing startup time significantly.

**Use production builds for performance testing.** Development builds have extra checks and logging that make them measurably slower than production builds. Never judge performance from \`npx expo start\`.

\`\`\`bash
# Build a local production APK for testing
eas build --platform android --profile preview --local
\`\`\`

**Enable \`inline requires\`** in \`metro.config.js\` for faster startup — modules are only loaded when first accessed:
\`\`\`js
module.exports = {
  transformer: { inlineRequires: true },
};
\`\`\`

**Avoid \`console.log\` in production.** Every log statement serialises its arguments to a string. Remove them with a Babel plugin:
\`\`\`bash
bun add -D babel-plugin-transform-remove-console
\`\`\`

Following these techniques in order — measure first, then fix the biggest bottleneck — will get most apps to consistently smooth 60fps.
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
