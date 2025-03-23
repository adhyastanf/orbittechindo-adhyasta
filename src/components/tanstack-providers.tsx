'use client';

import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';

interface TanstackProviderProps {
  children: ReactNode;
}

function makeQueryClient(){
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime : 60 * 1000
      }
    }
  })
}

let browserQueryClient : QueryClient | undefined = undefined;

function getQueryClient(){
  if(isServer){
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export const ProvidersTanstack = ({ children }: TanstackProviderProps) => {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
