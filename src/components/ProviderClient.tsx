"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  persistQueryClient,
  removeOldestQuery,
} from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "offlineFirst",
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
    mutations: {
      networkMode: "offlineFirst",
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      retry: 1,
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
  retry: removeOldestQuery,
});

persistQueryClient({
  queryClient: client,
  persister: localStoragePersister,
});

const ProviderClient = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export const withProviderClient = (Component: React.ComponentType) => {
  return function ComponentWithProviderClient(props: any) {
    return (
      <ProviderClient>
        <Component {...props} />
      </ProviderClient>
    );
  };
};

export default ProviderClient;
