"use client";

import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface props {
  children: React.ReactNode;
}

const QueryClientSetup: React.FC<props> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries for all queries
        //refetchOnWindowFocus: process.env.NODE_ENV !== "development",
      },
    },
    queryCache: new QueryCache({
      onError: (err, query) => {},
    }),
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryClientSetup;
