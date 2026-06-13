import { QueryClientConfig } from "@tanstack/react-query";

/**
 * Global configurations for React Query.
 * Optimized for SSR: prevent caching issues between user sessions.
 */
export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
      gcTime: 1000 * 60 * 10,   // Cache is garbage collected after 10 minutes
      retry: 1,                 // Retry failing requests once
      refetchOnWindowFocus: false, // Avoid unexpected layout shifts on tab switch
      refetchOnReconnect: "always",
    },
  },
};
