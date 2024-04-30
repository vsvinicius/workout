import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import UsersAvatar from './UsersAvatar';
import { useState } from 'react';
import {
  FitnessCenterOutlined,
  MenuOutlined,
  TimerOutlined,
} from '@mui/icons-material';
import RestModal from './RestModal';
import { useAlertContext } from '@context/AlertContext';

export const RESTING_TIME_KEY = 'resting_time';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { showSuccessMessage, showErrorMessage } = useAlertContext();

  function toggleDrawer(drawerState: boolean) {
    setIsOpen(drawerState);
  }

  function saveRestingTime(restingTime: string) {
    try {
      localStorage.setItem(RESTING_TIME_KEY, restingTime);
      setModalOpen(false);
      showSuccessMessage('Tempo de descanso ajustado');
    } catch {
      showErrorMessage(
        'Erro ao salvar o tempo de descanso, tente novamente mais tarde',
      );
    }
  }

  return (
    <div className="flex items-center justify-between p-4">
      <Drawer
        open={isOpen}
        onClose={() => toggleDrawer(false)}
        PaperProps={{
          className: 'bg-paper',
        }}
      >
        <Box
          role="presentation"
          className="w-56 pt-4 text-white"
          onClick={() => toggleDrawer(false)}
        >
          <List>
            <ListItem
              key="current-workout"
              disablePadding
              onClick={() => toggleDrawer(false)}
            >
              <ListItemButton>
                <ListItemIcon>
                  <FitnessCenterOutlined className="w-5 -rotate-45 text-white" />
                </ListItemIcon>
                <ListItemText primary="Treino atual" />
              </ListItemButton>
            </ListItem>
            <ListItem
              key="set-resting-time"
              disablePadding
              onClick={() => setModalOpen(true)}
            >
              <ListItemButton>
                <ListItemIcon>
                  <TimerOutlined className="w-5 -rotate-45 text-white" />
                </ListItemIcon>
                <ListItemText primary="Ajustar descanso" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <MenuOutlined
        className="h-8 w-8 text-white"
        onClick={() => toggleDrawer(true)}
      />
      <UsersAvatar />
      <RestModal
        open={modalOpen}
        onSave={saveRestingTime}
        onCancel={() => setModalOpen(false)}
        restingTime={localStorage.getItem(RESTING_TIME_KEY) ?? ''}
      />
    </div>
  );
}
