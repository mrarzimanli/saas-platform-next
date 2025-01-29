"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { LanguageProvider } from "@/providers/LanguageProvider";

export default function RootLayoutView({ children, font }: Readonly<{ children: React.ReactNode; font: { variable: string } }>) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        cacheTime: 0,
        retry: true,
        retryDelay: (failureCount) => failureCount * 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <html lang={"en"}>
        <body className={font.variable}>
          <LanguageProvider>{children}</LanguageProvider>
        </body>
      </html>
    </QueryClientProvider>
  );
}
