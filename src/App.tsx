import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';

import Notes from '@/features/notes';
import Notifications, { NotificationProvider } from '@/features/notifications';
import { QueryProvider } from '@/providers/QueryProvider';

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
      <NotificationProvider>
        <QueryProvider>
          <Notifications />
          <Notes />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
      </NotificationProvider>
    </ErrorBoundary>
  );
}

export default App;
