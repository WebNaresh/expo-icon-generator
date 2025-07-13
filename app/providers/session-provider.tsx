"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

interface SessionProviderProps {
  children: React.ReactNode;
}
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export function SessionProvider({ children }: SessionProviderProps) {
  const queryClient = new QueryClient();
  return (
    <NextAuthSessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </NextAuthSessionProvider>
  );
}
