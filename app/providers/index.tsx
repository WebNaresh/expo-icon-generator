"use client";

import { SessionProvider } from "./session-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Main providers component that wraps the entire application
 * with all necessary context providers.
 *
 * This component combines all providers in the correct order:
 * - SessionProvider: NextAuth.js authentication context
 * - Future providers can be added here (Theme, State Management, etc.)
 */
export function Providers({ children }: ProvidersProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
