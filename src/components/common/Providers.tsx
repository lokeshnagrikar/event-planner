"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SmoothScroll from "../animations/SmoothScroll";
import PageTransition from "../animations/PageTransition";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  // Prevent shared client cache during Server-Side Rendering
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll>
        <PageTransition>
          {children}
        </PageTransition>
      </SmoothScroll>
    </QueryClientProvider>
  );
}
