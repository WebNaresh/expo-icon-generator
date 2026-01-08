import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft, Tag, Share2 } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
}

// This would typically come from a CMS or database
const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
  const posts: Record<string, BlogPost> = {
    "complete-guide-expo-icon-generation": {
      slug: "complete-guide-expo-icon-generation",
      title: "The Complete Guide to Expo Icon Generation in 2024",
      description:
        "Master the art of creating perfect icons for your Expo React Native apps. Learn about sizing, formats, optimization techniques, and platform-specific requirements.",
      content: `
# The Complete Guide to Expo Icon Generation in 2024

Creating the perfect icon for your Expo React Native app is crucial for user engagement and app store success. This comprehensive guide covers everything you need to know about icon generation, from basic requirements to advanced optimization techniques.

## Why App Icons Matter

Your app icon is the first impression users have of your application. Research shows that well-designed icons can increase download rates by up to 30%. A professional icon communicates quality, builds trust, and helps your app stand out in crowded app stores.

### Key Statistics:
- **73% of users** judge app quality by the icon design
- **Apps with professional icons** see 25% higher retention rates
- **Consistent branding** across platforms increases recognition by 40%

## Understanding Icon Requirements

### iOS Icon Requirements
iOS has specific requirements for app icons that must be followed for App Store approval:

- **App Icon**: 1024×1024px (required for App Store)
- **iPhone**: 60×60px, 120×120px, 180×180px
- **iPad**: 76×76px, 152×152px, 167×167px
- **Apple Watch**: 24×24px to 108×108px (various sizes)
- **Mac Catalyst**: 16×16px to 1024×1024px

**Important iOS Guidelines:**
- No transparency or alpha channels
- Square format (iOS automatically applies corner radius)
- High-quality PNG format
- Avoid text that becomes unreadable at small sizes

### Android Icon Requirements
Android uses adaptive icons that provide more flexibility:

- **Adaptive Icon**: 1024×1024px (foreground + background)
- **Legacy Icon**: 512×512px (for older Android versions)
- **Notification Icons**: 24×24dp to 48×48dp
- **Action Bar Icons**: 24×24dp to 32×32dp

**Android Adaptive Icon System:**
- **Foreground Layer**: Your main icon design (108×108dp safe area)
- **Background Layer**: Solid color or simple pattern
- **Mask**: System applies various shapes (circle, square, rounded square)

## Expo Icon Configuration

Expo simplifies icon management through the app.json configuration file:

\`\`\`json
{
  "expo": {
    "name": "Your App Name",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png"
    },
    "ios": {
      "icon": "./assets/icon.png"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
\`\`\`

## Design Best Practices

### 1. Keep It Simple
- Use minimal elements that work at all sizes
- Avoid fine details that disappear when scaled down
- Focus on a single, recognizable concept

### 2. Choose Colors Wisely
- Use high contrast for visibility
- Consider color psychology and brand alignment
- Test on both light and dark backgrounds
- Ensure accessibility compliance (WCAG guidelines)

### 3. Typography Considerations
- Avoid text in icons when possible
- If text is necessary, use bold, readable fonts
- Test legibility at 29×29px (smallest iOS size)

### 4. Platform Consistency
- Maintain brand recognition across platforms
- Adapt to platform-specific design languages
- Consider cultural differences for global apps

## Advanced Optimization Techniques

### Image Optimization
- Use PNG format for best quality
- Optimize file sizes without quality loss
- Consider WebP for web versions
- Implement progressive loading for better UX

### Color Analysis and Background Selection
Modern icon generators can analyze your source image to suggest optimal background colors:

\`\`\`javascript
// Example color analysis implementation
const analyzeImageColors = async (imageFile) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Load and analyze image
  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const colors = extractDominantColors(imageData);
    
    return suggestBackgroundColor(colors);
  };
};
\`\`\`

### Automated Generation Workflow
Set up automated icon generation in your CI/CD pipeline:

\`\`\`yaml
# GitHub Actions example
name: Generate Icons
on:
  push:
    paths: ['assets/icon-source.png']

jobs:
  generate-icons:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Generate Icons
        run: |
          npm install -g expo-icon-generator
          expo-icon-generator --input assets/icon-source.png --output assets/
\`\`\`

## Testing and Validation

### Icon Testing Checklist
- [ ] Test at all required sizes
- [ ] Verify on different device backgrounds
- [ ] Check accessibility contrast ratios
- [ ] Validate App Store compliance
- [ ] Test with different system themes (light/dark)

### A/B Testing Your Icons
- Create multiple icon variations
- Test with focus groups or beta users
- Monitor download and engagement metrics
- Use app store optimization tools

## Common Mistakes to Avoid

1. **Using low-resolution source images**
2. **Ignoring platform-specific guidelines**
3. **Making icons too complex for small sizes**
4. **Using copyrighted or trademarked elements**
5. **Forgetting to test on actual devices**

## Tools and Resources

### Recommended Design Tools
- **Figma**: Free, web-based design tool
- **Sketch**: Mac-only, professional design software
- **Adobe Illustrator**: Industry standard vector graphics
- **Canva**: User-friendly with templates

### Icon Generation Tools
- **Expo Icon Generator**: Automated generation for Expo apps
- **App Icon Generator**: Multi-platform icon creation
- **Icon Kitchen**: Android adaptive icon tool
- **SF Symbols**: Apple's icon library for iOS

## Conclusion

Creating effective app icons requires understanding platform requirements, following design best practices, and implementing proper optimization techniques. By following this guide, you'll be able to create professional icons that enhance your app's appeal and improve user engagement.

Remember to always test your icons on real devices and gather user feedback to ensure your design resonates with your target audience.

## Next Steps

1. **Audit your current icon** against the guidelines in this article
2. **Create a style guide** for consistent branding
3. **Set up automated generation** for your development workflow
4. **Plan A/B tests** for icon optimization

Ready to generate perfect icons for your Expo app? Try our [Expo Icon Generator tool](/) to automate the entire process.
      `,
      author: "Naresh Bhosale",
      publishedAt: "2024-01-15",
      readTime: "12 min read",
      category: "Tutorial",
      tags: ["expo", "react-native", "icons", "mobile-development"],
      featured: true,
    },
    "ios-android-icon-requirements-2024": {
      slug: "ios-android-icon-requirements-2024",
      title: "iOS vs Android Icon Requirements: What You Need to Know",
      description:
        "Comprehensive breakdown of icon specifications for iOS App Store and Google Play Store. Includes adaptive icons, sizing guidelines, and submission requirements.",
      content: `
# iOS vs Android Icon Requirements: What You Need to Know

Understanding the differences between iOS and Android icon requirements is crucial for successful app store submissions. This comprehensive guide breaks down the specifications, best practices, and common pitfalls for both platforms.

## Platform Overview

### iOS: Precision and Consistency
Apple's approach to app icons emphasizes consistency, quality, and adherence to strict guidelines. The iOS ecosystem values:
- **Uniform appearance** across all apps
- **High-quality imagery** with no compromises
- **Strict compliance** with Human Interface Guidelines
- **Automatic corner radius** application by the system

### Android: Flexibility and Adaptation
Google's Android platform offers more flexibility while introducing complexity through adaptive icons:
- **Adaptive icon system** for dynamic theming
- **Multiple format support** for different Android versions
- **Flexible shapes** determined by device manufacturers
- **Backward compatibility** considerations

## Detailed Size Requirements

### iOS Icon Specifications

#### App Store and Device Icons
- **App Store Icon**: 1024×1024px (PNG, no transparency)
- **iPhone App Icon**: 60×60pt (120×120px @2x, 180×180px @3x)
- **iPad App Icon**: 76×76pt (152×152px @2x, 167×167px @2x for iPad Pro)
- **Apple Watch**: Multiple sizes from 24×24px to 108×108px
- **Mac Catalyst**: 16×16px to 1024×1024px (various densities)

#### Settings and Spotlight Icons
- **iPhone Settings**: 29×29pt (58×58px @2x, 87×87px @3x)
- **iPhone Spotlight**: 40×40pt (80×80px @2x, 120×120px @3x)
- **iPad Settings**: 29×29pt (58×58px @2x)
- **iPad Spotlight**: 40×40pt (80×80px @2x)

#### Technical Requirements
- **Format**: PNG only
- **Color Space**: sRGB or P3
- **Transparency**: Not allowed
- **Compression**: Lossless
- **Layers**: Flattened image only

### Android Icon Specifications

#### Adaptive Icons (Android 8.0+)
- **Foreground**: 1024×1024px (108×108dp safe area in center)
- **Background**: 1024×1024px (solid color or simple pattern)
- **Full Size**: 1024×1024px (combined layers)
- **Safe Zone**: 66×66dp (center area guaranteed visible)

#### Legacy Icons (Android 7.1 and below)
- **LDPI**: 36×36px (0.75x)
- **MDPI**: 48×48px (1x baseline)
- **HDPI**: 72×72px (1.5x)
- **XHDPI**: 96×96px (2x)
- **XXHDPI**: 144×144px (3x)
- **XXXHDPI**: 192×192px (4x)

#### Google Play Store
- **High-res Icon**: 512×512px (PNG, 32-bit)
- **Feature Graphic**: 1024×500px (optional but recommended)

## Design Guidelines Comparison

### iOS Design Principles

#### Visual Characteristics
- **Realistic depth and dimension**
- **Rich, saturated colors**
- **Subtle gradients and shadows**
- **Crisp, clean edges**
- **No text overlays**

#### Best Practices
\`\`\`
✅ DO:
- Use the full 1024×1024px canvas
- Create depth with gradients and shadows
- Ensure icon works on all backgrounds
- Test at smallest size (29×29px)
- Follow Apple's design language

❌ DON'T:
- Add transparency or alpha channels
- Use system UI elements
- Include text that becomes unreadable
- Create overly complex designs
- Ignore accessibility guidelines
\`\`\`

### Android Design Principles

#### Adaptive Icon System
The adaptive icon system consists of two layers:

1. **Foreground Layer**: Your main icon design
2. **Background Layer**: Solid color or simple pattern

\`\`\`xml
<!-- Example adaptive icon configuration -->
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@drawable/ic_launcher_foreground"/>
</adaptive-icon>
\`\`\`

#### Material Design Guidelines
- **Bold, graphic, intentional**
- **Consistent with Material Design principles**
- **Scalable and recognizable**
- **Works across different shapes and sizes**

## Platform-Specific Considerations

### iOS Specific Requirements

#### App Store Review Guidelines
- Icons must accurately represent the app's functionality
- No placeholder or generic icons
- Must be original artwork (no copyrighted material)
- Should not include Apple hardware or software elements
- Must be appropriate for all audiences if targeting general audience

#### Technical Validation
\`\`\`bash
# Validate iOS icons using command line tools
xcrun altool --validate-app -f YourApp.ipa -t ios -u username -p password

# Check icon specifications
sips -g pixelWidth -g pixelHeight icon.png
\`\`\`

### Android Specific Requirements

#### Adaptive Icon Considerations
- **Keyline shapes**: Circle, square, rounded square, squircle
- **Dynamic theming**: Icons adapt to user's theme preferences
- **Animation support**: Foreground can animate independently
- **Backward compatibility**: Provide legacy icons for older devices

#### Google Play Console Requirements
- High-resolution icon must be exactly 512×512px
- PNG format with 32-bit color depth
- No transparency in the background
- Must represent the actual app functionality

## Common Mistakes and Solutions

### iOS Common Issues

1. **Using Transparency**
   - ❌ Problem: Adding alpha channels or transparent backgrounds
   - ✅ Solution: Use solid backgrounds or gradients

2. **Poor Small-Size Legibility**
   - ❌ Problem: Complex designs that become unclear at 29×29px
   - ✅ Solution: Test at all sizes, simplify if necessary

3. **Inconsistent Branding**
   - ❌ Problem: Icon doesn't match app's visual identity
   - ✅ Solution: Maintain consistent color palette and style

### Android Common Issues

1. **Ignoring Safe Area**
   - ❌ Problem: Important elements outside the 66×66dp safe zone
   - ✅ Solution: Keep critical elements within the safe area

2. **Complex Backgrounds**
   - ❌ Problem: Detailed background layers that conflict with foreground
   - ✅ Solution: Use simple, solid colors or subtle patterns

3. **Legacy Icon Neglect**
   - ❌ Problem: Not providing fallback icons for older Android versions
   - ✅ Solution: Include complete legacy icon set

## Testing and Validation

### iOS Testing Checklist
- [ ] Test on all device sizes (iPhone, iPad, Apple Watch)
- [ ] Verify appearance on light and dark backgrounds
- [ ] Check App Store Connect validation
- [ ] Test with iOS simulator at various sizes
- [ ] Validate accessibility contrast ratios

### Android Testing Checklist
- [ ] Test adaptive icon on different launcher shapes
- [ ] Verify legacy icon appearance on older devices
- [ ] Check Google Play Console validation
- [ ] Test with different Android themes
- [ ] Validate on various screen densities

## Automation and Tools

### Recommended Tools

#### Design Tools
- **Figma**: Free, collaborative design platform
- **Sketch**: Mac-only, professional design tool
- **Adobe Illustrator**: Vector-based design for scalability
- **Affinity Designer**: Cost-effective alternative to Adobe

#### Generation Tools
- **Expo Icon Generator**: Automated generation for React Native
- **App Icon Generator**: Multi-platform icon creation
- **Android Asset Studio**: Google's official icon generator
- **Icon Slate**: Mac app for icon generation

### Automated Workflow Example
\`\`\`javascript
// Example automation script
const generateIcons = async (sourceImage) => {
  const iosIcons = await generateiOSIcons(sourceImage);
  const androidIcons = await generateAndroidIcons(sourceImage);

  return {
    ios: iosIcons,
    android: androidIcons,
    validation: await validateIcons(iosIcons, androidIcons)
  };
};
\`\`\`

## Conclusion

Success in both app stores requires understanding and respecting each platform's unique requirements. While iOS emphasizes consistency and quality, Android offers flexibility through adaptive icons.

Key takeaways:
- **Plan for both platforms** from the design phase
- **Test extensively** on real devices
- **Automate generation** to ensure consistency
- **Stay updated** with platform guideline changes

## Next Steps

1. **Audit your current icons** against these guidelines
2. **Create platform-specific versions** if needed
3. **Set up automated testing** for future updates
4. **Monitor app store feedback** for icon-related issues

Ready to create compliant icons for both platforms? Use our [Expo Icon Generator](/) to automatically generate all required sizes and formats.
      `,
      author: "Naresh Bhosale",
      publishedAt: "2024-01-10",
      readTime: "8 min read",
      category: "Guide",
      tags: ["ios", "android", "app-store", "guidelines"],
      featured: true,
    },
  };

  return posts[slug] || null;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Expo Icon Generator Blog`,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Back Navigation */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="mb-6 flex items-center gap-4">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>

          <h1 className="mb-6 text-4xl leading-tight font-bold text-gray-900 md:text-5xl">
            {post.title}
          </h1>

          <p className="mb-8 text-xl leading-relaxed text-gray-600">
            {post.description}
          </p>

          <div className="flex items-center justify-between border-y border-gray-200 py-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <User className="h-5 w-5" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-5 w-5" />
                <span>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            <button className="flex items-center gap-2 text-gray-600 transition-colors hover:text-blue-600">
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </button>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div
            className="leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/\n/g, "<br />")
                .replace(/#{1,6}\s/g, (match) => {
                  const level = match.trim().length;
                  return `<h${level} class="text-${
                    4 - level
                  }xl font-bold text-gray-900 mt-8 mb-4">`;
                })
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
            }}
          />
        </article>

        {/* Tags */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Tags</h3>
          <div className="flex flex-wrap gap-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="cursor-pointer rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
              >
                <Tag className="mr-1 inline h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 rounded-xl bg-linear-to-r from-blue-50 to-sky-50 p-8 text-center">
          <h3 className="mb-4 text-2xl font-bold text-gray-900">
            Ready to Generate Perfect Icons?
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-gray-600">
            Put these techniques into practice with our automated icon
            generation tool. Create platform-specific icons from a single source
            image in seconds.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Try Icon Generator
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
