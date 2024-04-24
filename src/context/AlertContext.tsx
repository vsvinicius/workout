import { Alert, Collapse } from '@mui/material';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

interface AlertContextResponse {
  showSuccessMessage: (message: string) => void;
  showErrorMessage: (message: string) => void;
}

const AlertContext = createContext<AlertContextResponse | null>(null);

export default function AlertContextProvider({ children }: PropsWithChildren) {
  const [message, setMessage] = useState<string>();
  const [variant, setVariant] = useState<'success' | 'error'>();
  const [showAlert, setShowAlert] = useState(false);

  function showSuccessMessage(successMessage: string) {
    setMessage(successMessage);
    setVariant('success');
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1500);
  }
  function showErrorMessage(errorMessage: string) {
    setMessage(errorMessage);
    setVariant('error');
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  }

  return (
    <AlertContext.Provider value={{ showErrorMessage, showSuccessMessage }}>
      <Collapse
        in={showAlert}
        sx={{ position: 'fixed', bottom: 0, zIndex: 10, width: '100%' }}
      >
        <Alert
          severity={variant}
          variant="filled"
          sx={{
            height: '4rem',
            display: 'flex',
            alignItems: 'center',
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
        >
          {message}
        </Alert>
      </Collapse>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlertContext() {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error(
      'useAlertContext must be used within AlertContext.Provider',
    );
  }

  return context;
}
