import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';

import Notes from '@/features/notes';
import { queryClient } from '@/lib/react-query';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div role="alert">
      <h1>someting went wrong:</h1>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={() => window.location.assign(window.location.origin)}>
        refresh
      </button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <Notes />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
