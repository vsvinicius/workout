import { BrowserRouter } from 'react-router-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { StyledEngineProvider } from '@mui/system';

import Router from '@src/Router';
import UserContextProvider from './context/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import theme from './styles/theme';

const queryClient = new QueryClient();

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <QueryClientProvider client={queryClient}>
            <UserContextProvider>
              <CssBaseline />
              <Router />
            </UserContextProvider>
          </QueryClientProvider>
        </StyledEngineProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
