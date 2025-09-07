# Components Structure

This folder contains all the components and hooks used in the main page, organized for better maintainability and separation of concerns.

## Components

### UI Components

- `hero-section.tsx` - Hero section with main title and feature highlights
- `file-upload-area.tsx` - File upload interface with drag-and-drop, paste, and color picker
- `generated-icons-display.tsx` - Display grid for generated icons with download functionality
- `features-section.tsx` - Features overview section
- `contributors-section.tsx` - Contributors display with GitHub information
- `how-it-works-section.tsx` - Step-by-step instructions
- `comprehensive-guide-section.tsx` - Detailed guide cards
- `technical-specifications-section.tsx` - Technical specs and requirements
- `app-store-optimization-section.tsx` - ASO tips and strategies

### Custom Hooks

- `use-file-upload.ts` - Handles file upload, validation, drag-and-drop, paste, and color analysis
- `use-contributors.ts` - Fetches and manages contributors data from GitHub API
- `use-icon-generation.ts` - Handles icon generation, download functionality

### Exports

- `index.ts` - Barrel exports for cleaner imports

## Benefits of This Structure

1. **Separation of Concerns**: Each component has a single responsibility
2. **Reusability**: Components can be easily reused or modified
3. **Maintainability**: Easier to find and update specific functionality
4. **Testing**: Individual components can be tested in isolation
5. **Code Organization**: Related logic is grouped together
6. **Performance**: Allows for better code splitting and optimization

## Usage

```tsx
import {
  HeroSection,
  FileUploadArea,
  // ... other components
  useFileUpload,
  useContributors,
  useIconGeneration,
} from "./_components";
```

The main page component (`page.tsx`) now focuses on orchestrating these components rather than containing all the implementation details.
