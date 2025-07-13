# Environment Variables - SkillCircle Platform

This directory contains type-safe environment variable utilities for the SkillCircle Next.js application.

## Files Overview

- **`env.d.ts`** - TypeScript declarations for environment variables
- **`env.ts`** - Utility functions for type-safe environment variable access
- **`env-validation.ts`** - Runtime validation and configuration object
- **`env-setup.ts`** - Application initialization and setup

## Usage

### 1. Basic Usage

```typescript
import { env } from '@/lib/env-validation';

// Type-safe access to environment variables
const databaseUrl = env.DATABASE_URL;
const isProduction = env.IS_PRODUCTION;
const mapsApiKey = env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
```

### 2. Client-Side Usage

```typescript
import { clientEnv } from '@/lib/env-validation';

// Only client-safe variables (NEXT_PUBLIC_*)
const mapsApiKey = clientEnv.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const isDev = clientEnv.IS_DEVELOPMENT;
```

### 3. Utility Functions

```typescript
import { getRequiredEnv, getBooleanEnv, getNumericEnv } from '@/lib/env';

// Get required variable with validation
const secret = getRequiredEnv('NEXTAUTH_SECRET');

// Get boolean with default
const enableFeature = getBooleanEnv('ENABLE_FEATURE', false);

// Get number with default
const port = getNumericEnv('PORT', 3000);
```

### 4. Application Setup

```typescript
// In your _app.tsx or layout.tsx
import '@/lib/env-setup'; // Auto-validates on import

// Or manually initialize
import { initializeEnvironment } from '@/lib/env-setup';
initializeEnvironment();
```

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | MongoDB connection string | `mongodb+srv://...` |
| `NEXTAUTH_SECRET` | NextAuth.js secret (32+ chars) | `your-secret-here` |
| `NEXTAUTH_URL` | Application URL | `http://localhost:8888` |
| `AUTH_GOOGLE_ID` | Google OAuth Client ID | `123...googleusercontent.com` |
| `AUTH_GOOGLE_SECRET` | Google OAuth Client Secret | `GOCSPX-...` |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps API key | `AIzaSy...` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Development server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |

## Features

### ✅ Type Safety
- Full TypeScript intellisense for all environment variables
- Compile-time checking for missing variables
- Proper typing for different variable types

### ✅ Runtime Validation
- Validates all required variables are present
- Checks format and structure of URLs and keys
- Environment-specific validation rules

### ✅ Security
- Separates client-safe and server-only variables
- Prevents accidental exposure of secrets
- Validates secret strength in production

### ✅ Developer Experience
- Helpful error messages with fix suggestions
- Auto-completion in IDEs
- Environment summary for debugging

## Error Handling

The system provides detailed error messages:

```
❌ Environment Variable Validation Failed:

  • Missing required environment variable: DATABASE_URL
  • NEXTAUTH_SECRET should be at least 32 characters long for security
  • AUTH_GOOGLE_ID should be a valid Google OAuth Client ID

📝 Please check your .env file and ensure all required variables are set.
📚 See the project README for environment setup instructions.
```

## Best Practices

1. **Always use the `env` object** instead of `process.env` directly
2. **Import `@/lib/env-setup`** early in your application
3. **Use `clientEnv`** for client-side code to avoid exposing secrets
4. **Validate new variables** by adding them to the validation function
5. **Update type declarations** when adding new environment variables

## Adding New Variables

1. Add to `.env` file:
```bash
NEW_VARIABLE="value"
```

2. Update `env.d.ts`:
```typescript
interface ProcessEnv {
  NEW_VARIABLE: string;
}
```

3. Add validation in `env-validation.ts`:
```typescript
get NEW_VARIABLE(): string {
  return getRequiredEnv('NEW_VARIABLE');
},
```

4. Add validation logic if needed:
```typescript
const newVar = getRequiredEnv('NEW_VARIABLE');
if (newVar.length < 10) {
  errors.push('NEW_VARIABLE must be at least 10 characters');
}
```

## Troubleshooting

### Common Issues

1. **"Missing required environment variable"**
   - Check your `.env` file exists
   - Ensure the variable is spelled correctly
   - Restart your development server

2. **"Invalid URL format"**
   - Ensure URLs include `http://` or `https://`
   - Check for typos in the URL

3. **TypeScript errors**
   - Restart your TypeScript server
   - Check `env.d.ts` is in your project root
   - Ensure the variable is declared in the interface
