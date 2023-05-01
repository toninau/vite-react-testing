import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useNotifications } from '@/features/notifications';
import React, { useState } from 'react';

function makeString(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const { addNotification } = useNotifications();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
        queryCache: new QueryCache({
          onError: (error, query) =>
            addNotification({
              id: makeString(32),
              text: makeString(15),
              title: makeString(5),
            }),
        }),
        mutationCache: new MutationCache({
          onError: (error) =>
            // If this mutation has an onError defined, skip this
            // if (mutation.options.onError) return;
            addNotification({
              id: makeString(32),
              text: makeString(15),
              title: makeString(5),
            }),
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
