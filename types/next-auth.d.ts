/**
 * NextAuth.js Type Extensions for SkillCircle Platform
 * Extends default NextAuth types with custom user properties
 */

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
      isSetupCompleted: boolean;
      isActive: boolean;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    image?: string;
    isSetupCompleted: boolean;
    isActive: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    isSetupCompleted: boolean;
    isActive: boolean;
  }
}
