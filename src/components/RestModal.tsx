import {
  Backdrop,
  Box,
  Divider,
  Fade,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import Button from './Button';
import { useState } from 'react';

interface RestModalProps {
  open: boolean;
  restingTime: string;
  onCancel: () => void;
  onSave: (restingTime: string) => void;
}

export default function RestModal({
  open,
  restingTime,
  onCancel,
  onSave,
}: RestModalProps) {
  const [newRestingTime, setNewRestingTime] = useState<string>(restingTime);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewRestingTime(e.target.value);
  }

  return (
    <Modal
      open={open}
      onClose={onCancel}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 300,
          sx: {
            backdropFilter: 'blur(3px)',
          },
        },
      }}
    >
      <Fade in={open}>
        <Paper
          elevation={10}
          className="absolute right-1/2 top-28 flex w-[96%] translate-x-1/2 transform flex-col rounded-lg bg-background-light py-5"
        >
          <div className="w-full px-4">
            <Typography variant="h5" className="mb-8 text-white">
              Tempo de descanso
            </Typography>
            <TextField
              label="Descanso em segundos"
              type="number"
              variant="standard"
              className="w-full"
              InputProps={{ className: 'text-white' }}
              value={newRestingTime}
              onChange={handleChange}
            />
          </div>
          <Divider className="mt-16 bg-white opacity-30" />
          <div className="mt-4 flex w-full justify-end gap-2 px-4">
            <Button variant="outlined" onClick={onCancel}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={() => onSave(newRestingTime)}>
              Salvar
            </Button>
          </div>
        </Paper>
      </Fade>
    </Modal>
  );
}
