import { createTheme } from '@mui/material';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

export default createTheme({
  palette: {
    mode: 'light',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:disabled': {
            backgroundColor: '#AFB1B2',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '--TextField-brandBorderColor': '#AFB1B2',
          '--TextField-brandBorderHoverColor': 'rgb(255,255,255,0.1)',
          '& label': {
            color: 'var(--TextField-brandBorderColor)',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: 'var(--TextField-brandBorderColor)',
        },
        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: 'var(--TextField-brandBorderHoverColor)',
        },
        [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: 'var(--TextField-brandBorderFocusedColor)',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&::before': {
            borderBottom: '2px solid var(--TextField-brandBorderColor)',
          },
          '&:hover:not(.Mui-disabled, .Mui-error):before': {
            borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
          },
        },
      },
    },
  },
});
