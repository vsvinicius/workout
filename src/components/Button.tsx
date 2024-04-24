import {
  ButtonProps as MuiButtonProps,
  Button as MuiButton,
  CircularProgress,
} from '@mui/material';

type ButtonProps = MuiButtonProps & {
  isLoading?: boolean;
};
export default function Button({ isLoading = false, ...props }: ButtonProps) {
  return (
    <MuiButton {...props} disabled={isLoading || props.disabled}>
      {isLoading ? (
        <CircularProgress size="1.5rem" sx={{ color: 'gray' }} />
      ) : (
        props.children
      )}
    </MuiButton>
  );
}
