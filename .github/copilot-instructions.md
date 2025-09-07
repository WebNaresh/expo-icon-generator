# Copilot Instructions for AI Coding Agents

## Project Overview

- **Expo Icon Generator** is a Next.js 15+ (App Router) web app for generating platform-specific icons (iOS, Android, web) from a single image, optimized for Expo React Native projects.
- Core logic for icon generation and image processing is in `app/api/generate-icons/route.ts` (uses Sharp for image manipulation).
- The UI is built with TypeScript, TailwindCSS, and Shadcn/ui components. All user-facing logic is in `app/` and `components/`.

## Key Architectural Patterns

- **API Routes**: All backend logic (image processing, ZIP creation) is in `app/api/` (see `generate-icons/` and `download-icons/`).
- **Component Structure**: UI is modularized in `components/` (with `utils/` for navbar/footer, and `ui/` for Shadcn components).
- **Libs**: Shared utilities are in `lib/` (e.g., `lib/utils.ts`).
- **Static Assets**: All static files (logos, manifest icons) are in `public/`.
- **App Router**: Uses Next.js App Router (`app/`), not the legacy Pages Router.

## Developer Workflows

- **Install**: `npm install --legacy-peer-deps` (Sharp requires legacy peer deps)
- **Dev Server**: `npm run dev` (Turbopack, port 8888) - **DO NOT RUN** - Server is always running
- **Build**: `npm run build`
- **Start**: `npm run start`
- **Lint**: `npm run lint`
- **Type Check**: `npx tsc --noEmit`
- **API Testing**: Use `/api/generate-icons` and `/api/download-icons` endpoints for programmatic access.

## Important Development Rules

- **Never run `npm run dev`** - The development server is always running in the background
- **Hot reload is active** - Changes to files will automatically reload in the browser
- **Use TypeScript checking** - Run `npx tsc --noEmit` to check for type errors without starting server

## Project-Specific Conventions

- **Icon Specs**: To add new icon formats, update `ICON_SPECS` in `app/api/generate-icons/route.ts` and UI display logic.
- **Image Validation**: Only PNG, JPG, JPEG, SVG under 10MB are accepted (see upload logic in main page/component).
- **Expo Integration**: Generated icons follow Expo's naming and sizing conventions for seamless `app.json` integration.
- **Error Handling**: All errors (upload, processing) are surfaced with clear UI messages.
- **File Organization**: All generated/downloaded files are named for Expo compatibility.

## Integration Points

- **Sharp**: Used for all image processing (resize, crop, optimize).
- **JSZip**: Used for creating ZIP downloads of generated icons.
- **Expo**: Output is designed for direct use in Expo projects (`app.json` example in README).

## Examples

- **API Usage**: See `/api/generate-icons` and `/api/download-icons` for request/response formats.
- **Adding Icons**: To support a new icon, update `ICON_SPECS` and add UI logic for preview/download.
- **Error Recovery**: If Sharp fails, ensure error is caught and user is notified in the UI.

## References

- See `README.md` for full workflow, troubleshooting, and API documentation.
- Key files: `app/api/generate-icons/route.ts`, `app/page.tsx`, `components/`, `lib/utils.ts`.

---

For any unclear conventions or missing patterns, consult the README or ask for clarification from maintainers.
