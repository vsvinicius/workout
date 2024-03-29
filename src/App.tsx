import { BrowserRouter } from 'react-router-dom';

import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/system';

import Router from '@src/Router';
import UserContextProvider from './context/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <QueryClientProvider client={queryClient}>
          <UserContextProvider>
            <CssBaseline />
            <Router />
          </UserContextProvider>
        </QueryClientProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  );
}
