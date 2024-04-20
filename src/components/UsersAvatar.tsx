import { User } from '@models/User';
import {
  IconButton,
  Avatar,
  Popover,
  MenuList,
  MenuItem,
  Typography,
} from '@mui/material';
import { useUserContext } from '@src/context/UserContext';
import UsersService from '@src/services/UsersService';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function UsersAvatar() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorEl);
  const { selectedUser, setSelectedUser } = useUserContext();

  const { data: users, isLoading } = useQuery({
    queryKey: ['users-list'],
    queryFn: () => UsersService.getUsers(),
  });

  useEffect(() => {
    if (!selectedUser && users) {
      setSelectedUser(users[0]);
    }
  }, [selectedUser, users]);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleChangeUser(user: User) {
    setSelectedUser(user);
    handleClose();
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton onClick={handleClick} disabled={isLoading}>
        <Avatar className="bg-green-500 uppercase">
          {selectedUser?.name[0]}
        </Avatar>
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        slotProps={{
          paper: {
            className: 'bg-background-light',
          },
        }}
      >
        <MenuList className="rounded-md border border-solid border-white-light bg-background-light p-0">
          {users?.map((user) => (
            <MenuItem
              key={user.id}
              onClick={() => handleChangeUser(user)}
              className="flex gap-2"
            >
              <Avatar className="bg-green-500 uppercase">{user.name[0]}</Avatar>
              <Typography className="text-white">{user.name}</Typography>
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </>
  );
}
