import './styles/index.scss';

import RootLayout from '@widgets/RootLayout';
import { BrowserRouter } from 'react-router-dom';

import AppRouter from './providers/AppRouter';
import ErrorBoundary from './providers/ErrorBoundary';
import ThemeProvider from './providers/ThemeProvider';

function App() {

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ThemeProvider>
          <RootLayout>
            <AppRouter />
          </RootLayout>
        </ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
