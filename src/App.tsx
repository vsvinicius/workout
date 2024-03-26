import { BrowserRouter } from 'react-router-dom';

import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/system';

import Router from '@src/Router';

export default function App() {
  return (
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <Router />
      </StyledEngineProvider>
    </BrowserRouter>
  );
}
