import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query';
import { render } from '@testing-library/react';
import React from 'react';

const queryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
};

const createTestQueryClient = () => new QueryClient(queryConfig);

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();

  function Wrapper({ children }: { children: React.ReactElement }) {
    return (
      <QueryClientProvider client={testQueryClient}>
        {children}
      </QueryClientProvider>
    );
  }

  return render(ui, { wrapper: Wrapper });
}
