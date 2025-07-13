# Expo Icon Generator - Automate Your App Icons

A modern tool designed to automate and simplify icon generation for Expo-based React Native apps. Generate platform-specific icons (iOS, Android, web) from a single source image with one command. Features image optimization, sharp scaling, custom background and padding, and automatic app.json updates.

![Expo Icon Generator](https://img.shields.io/badge/Tool-Expo_Icon_Generator-0ea5e9?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)
![Sharp](https://img.shields.io/badge/Sharp-Image_Processing-green?style=for-the-badge)

## 🌟 Tool Overview

Expo Icon Generator is a powerful web-based tool that streamlines the process of creating platform-specific icons for Expo React Native applications. Upload a single high-quality image and automatically generate all the required icon sizes and formats for iOS, Android, and web platforms.

### 🎯 Purpose

- **Automate Icon Generation**: Generate all required icon sizes with one command
- **Multi-Platform Support**: Create icons for iOS, Android, and web platforms
- **Image Optimization**: Ensure crisp, high-quality icons with Sharp scaling
- **Developer Productivity**: Save hours of manual resizing and optimization
- **Expo Integration**: Perfect compatibility with Expo development workflow

## ✨ Core Features

### 1. Drag-and-Drop Upload Interface

- **File Support**: Accepts PNG, JPG, JPEG, and SVG image files
- **Visual Feedback**: Real-time drag-over states and upload progress
- **Image Preview**: Instant preview of uploaded source image
- **File Validation**: Automatic validation for file type and size (max 10MB)
- **Error Handling**: Clear error messages for invalid uploads

### 2. Automated Icon Generation

- **One-Command Generation**: Generate all required icon sizes with a single click
- **Multi-Platform Support**: Creates icons for iOS, Android, and web platforms
- **Sharp Image Processing**: High-quality scaling and optimization
- **Custom Cropping**: Intelligent cropping for partial logo variants
- **Splash Screen Icons**: Centered icons with proper padding for splash screens

### 3. Generated Icon Specifications

- **adaptive-icon.png**: 1024×1024px (Android adaptive icon)
- **favicon.png**: 48×48px (Web favicon)
- **icon.png**: 1024×1024px (Main app icon)
- **partial-react-logo.png**: 518×316px (Cropped top-right section)
- **react-logo.png**: 100×100px (1x density)
- **react-logo@2x.png**: 200×200px (2x density)
- **react-logo@3x.png**: 300×300px (3x density)
- **splash-icon.png**: 1024×1024px (Centered with padding)

### 4. Download & Export Options

- **Individual Downloads**: Download specific icon files as needed
- **Bulk ZIP Download**: Get all generated icons in a single ZIP file
- **Instant Preview**: View generated icons before downloading
- **Ready for Expo**: Icons are optimized and ready for Expo projects
- **File Organization**: Properly named files following Expo conventions

### 5. Developer Experience

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Processing**: Fast icon generation with visual feedback
- **Error Recovery**: Graceful handling of processing errors
- **Usage Instructions**: Clear step-by-step guidance for users
- **Expo Integration**: Perfect compatibility with Expo development workflow

## 🔄 How It Works - Practical Example

**Meet Sarah and Mike:**

**Sarah's Profile:**

- **Offers**: Photoshop expertise (5+ years of graphic design experience)
- **Wants to Learn**: Advanced Excel functions and data analysis
- **Availability**: Weekends, 2-3 hours per session

**Mike's Profile:**

- **Offers**: Excel mastery (financial analyst with advanced spreadsheet skills)
- **Wants to Learn**: Photoshop for personal photography projects
- **Availability**: Weekends, flexible timing

**The Exchange Process:**

1. **Discovery**: Sarah searches for "Excel" and finds Mike's profile
2. **Connection**: Sarah sends a swap request proposing to teach Photoshop in exchange for Excel lessons
3. **Agreement**: Mike accepts the request and they coordinate schedules
4. **Learning Sessions**: They meet for 4 sessions over 2 months:
   - Session 1: Sarah teaches Photoshop basics, Mike covers Excel fundamentals
   - Session 2: Advanced Photoshop techniques, Excel formulas and functions
   - Session 3: Photo editing workflows, Data analysis and pivot tables
   - Session 4: Creative projects, Advanced Excel automation
5. **Feedback**: Both leave positive reviews highlighting their learning experience
6. **Community Growth**: Their successful exchange builds trust and encourages others

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd skill_swap
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🛠️ Technology Stack

### Core Technologies

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript 5+
- **Database**: MongoDB with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth
- **Styling**: TailwindCSS with custom sky blue theme
- **UI Components**: Shadcn/ui components
- **State Management**: TanStack Query (React Query)
- **Icons**: Lucide React
- **Deployment**: Vercel

### Development Tools

- **Build Tool**: Turbopack for fast development
- **Code Quality**: ESLint with TypeScript rules
- **Package Manager**: npm/yarn/pnpm support
- **Database Studio**: Prisma Studio for database management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher
- **npm**, **yarn**, or **pnpm**: Latest version
- **MongoDB**: Local instance or MongoDB Atlas account
- **Git**: For version control
- **Google Cloud Account**: For OAuth authentication

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/WebNaresh/skill_swap.git
cd skill_swap
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### 3. Environment Configuration

Create a `.env.local` file in the project root:

```env
# Database Configuration
DATABASE_URL="mongodb://localhost:27017/skillcircle"
# For MongoDB Atlas: "mongodb+srv://username:password@cluster.mongodb.net/skillcircle"

# NextAuth.js Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key-here"

# Google OAuth Configuration
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Optional: Additional Configuration
NODE_ENV="development"
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push database schema (for development)
npx prisma db push

# Optional: View database in Prisma Studio
npx prisma studio
```

### 5. Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at `http://localhost:3000`

## 🔧 Environment Variables

| Variable               | Description                      | Required | Example                                 |
| ---------------------- | -------------------------------- | -------- | --------------------------------------- |
| `DATABASE_URL`         | MongoDB connection string        | Yes      | `mongodb://localhost:27017/skillcircle` |
| `NEXTAUTH_URL`         | Application URL for NextAuth     | Yes      | `http://localhost:3000`                 |
| `NEXTAUTH_SECRET`      | Secret key for NextAuth sessions | Yes      | `your-secret-key`                       |
| `GOOGLE_CLIENT_ID`     | Google OAuth client ID           | Yes      | `your-google-client-id`                 |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret       | Yes      | `your-google-client-secret`             |

### Getting Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client IDs
5. Set authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`

## 📁 Project Structure

```
skill_swap/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── components/        # Page-specific components
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   └── ...
├── components/            # Reusable components
│   ├── AppInputFields/    # Custom input components
│   ├── utils/            # Utility components (navbar, footer)
│   └── ...
├── lib/                  # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   └── ...
├── prisma/               # Database schema and migrations
│   └── schema.prisma     # Database schema
├── public/               # Static assets
└── ...
```

## 🔄 Development Workflow

### Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint for code quality

# Database Operations
npx prisma studio    # View database in Prisma Studio
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes to database
npx prisma migrate reset  # Reset database (development only)
```

## 🐛 Troubleshooting

### Common Issues

**1. Database Connection Issues**

```bash
# Check MongoDB is running
mongod --version

# Verify connection string in .env.local
# Ensure database exists and is accessible
```

**2. NextAuth Configuration Issues**

```bash
# Verify all OAuth credentials are correct
# Check NEXTAUTH_URL matches your domain
# Ensure NEXTAUTH_SECRET is set and secure
```

**3. Build Errors**

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Regenerate Prisma client
npx prisma generate
```

**4. TypeScript Errors**

```bash
# Run type checking
npm run type-check

# Check for missing dependencies
npm install @types/node @types/react @types/react-dom
```

## 🤝 Contributing Guidelines

We welcome contributions to SkillCircle! Please follow these guidelines:

### 1. Fork and Clone

- Fork the repository
- Clone your fork locally
- Create a new branch for your feature

### 2. Development

- Follow TypeScript best practices
- Use the existing code style and conventions
- Write meaningful commit messages
- Test your changes thoroughly

### 3. Pull Request Process

- Ensure your code passes all linting checks
- Update documentation if needed
- Create a detailed pull request description
- Link any related issues

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Developed by**: [NaviByte Innovation](http://navibyte.in/)
- **Community**: Thanks to all contributors and users
- **Technologies**: Built with amazing open source tools

---

**SkillCircle** - Empowering communities through skill exchange 🌟
