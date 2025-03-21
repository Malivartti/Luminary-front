import './styles/index.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';

import RootLayout from '@widgets/RootLayout';
import { SkeletonTheme } from 'react-loading-skeleton';
import { HashRouter } from 'react-router-dom';

import AppRouter from './providers/AppRouter';
import ErrorBoundary from './providers/ErrorBoundary';
import ThemeProvider from './providers/ThemeProvider';

function App() {

  return (
    <HashRouter>
      <ErrorBoundary>
        <ThemeProvider>
          <SkeletonTheme
            baseColor="var(--skeleton-base-color)"
            highlightColor="var(--skeleton-highlight-color)"
          >
            <RootLayout>
              <AppRouter />
            </RootLayout>
          </SkeletonTheme>
        </ThemeProvider>
      </ErrorBoundary>
    </HashRouter>
  );
}

export default App;
