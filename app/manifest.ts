import { MetadataRoute } from 'next'

/**
 * PWA Manifest configuration for Expo Icon Generator
 * Enhanced for modern icon generation experience
 *
 * Includes contributor information and GitHub repository details
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Expo Icon Generator - Automate Your App Icons',
    short_name: 'Expo Icons',
    description: 'A modern tool designed to automate and simplify icon generation for Expo-based React Native apps. Generate platform-specific icons (iOS, Android, web) from a single source image with one command. Developed by Naresh Bhosale. Contribute on GitHub: https://github.com/WebNaresh/expo-icon-generator',
    start_url: 'https://expo-assets-generator.vercel.app/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#0ea5e9',
    orientation: 'portrait-primary',
    scope: 'https://expo-assets-generator.vercel.app/',
    lang: 'en-US',
    categories: ['developer-tools', 'productivity', 'utilities', 'graphics'],
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      }
    ],

    // Additional PWA features
    id: 'expo-icon-generator-app',
    dir: 'ltr',
    prefer_related_applications: false,

    // Protocol handlers for deep linking - points to home page since it's the main tool
    protocol_handlers: [
      {
        protocol: 'web+expo-icons',
        url: '/?source=%s'
      }
    ],

    // Related applications and contributor information
    related_applications: [
      {
        platform: 'web',
        url: 'https://github.com/WebNaresh/expo-icon-generator',
        id: 'github-repository'
      }
    ]
  }
}
