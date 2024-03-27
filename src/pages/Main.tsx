import {
  Avatar,
  IconButton,
  MenuItem,
  MenuList,
  Popover,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { WorkoutAreas, workoutAVini, workoutAThy } from '@mock/workout-A';

import { workoutBVini, workoutBThy } from '@mock/workout-B';
import { workoutCVini, workoutCThy } from '@mock/workout-C';

import ExerciseItem from '@components/ExerciseItem';
import { useMemo, useState } from 'react';

type WorkoutType = 'a' | 'b' | 'c';
const WORKOUTS_V = {
  a: workoutAVini,
  b: workoutBVini,
  c: workoutCVini,
};
const WORKOUTS_T = {
  a: workoutAThy,
  b: workoutBThy,
  c: workoutCThy,
};
export default function Main() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorEl);

  const [workout, setWorkout] = useState<WorkoutType>(() => {
    const value = localStorage.getItem('workoutType');
    return (value || 'a') as WorkoutType;
  });
  const [user, setUser] = useState<string>(() => {
    const value = localStorage.getItem('user');
    return value || 'vinicius';
  });

  const selectedWorkout = useMemo(
    () => (user === 'vinicius' ? WORKOUTS_V[workout] : WORKOUTS_T[workout]),
    [workout, user],
  );

  const selectedAreas = useMemo(() => {
    const userWorkout = user === 'vinicius' ? WORKOUTS_V : WORKOUTS_T;
    const areas = Object.keys(userWorkout[workout]) as WorkoutAreas[];
    return areas.filter((area) => userWorkout[workout][area].length > 0);
  }, [workout, user]);

  function handleChangeWorkout(event: SelectChangeEvent) {
    setWorkout(event.target.value as WorkoutType);
    localStorage.setItem('workoutType', event.target.value);
  }
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }
  function handleChangeUser(user: string) {
    setUser(user);
    localStorage.setItem('user', user);
    handleClose();
  }
  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div className="h-full w-full bg-[#101418]" style={{ minHeight: '100vh' }}>
      <header className="flex w-full items-center justify-center pt-10">
        <div className="flex w-[60%] justify-end">
          <Select
            className="w-fit border border-solid border-[#AFB1B2] px-4"
            value={workout}
            onChange={handleChangeWorkout}
            sx={{
              color: 'white',
              '.MuiSvgIcon-root ': {
                fill: '#AFB1B2 !important',
              },
            }}
          >
            <MenuItem value="a">Treino A</MenuItem>
            <MenuItem value="b">Treino B</MenuItem>
            <MenuItem value="c">Treino C</MenuItem>
          </Select>
        </div>
        <div className="flex w-[30%] justify-end">
          <IconButton onClick={handleClick}>
            <Avatar
              className={`uppercase ${user === 'vinicius' ? 'bg-green-500' : 'bg-blue-500'}`}
            >
              {user[0]}
            </Avatar>
          </IconButton>
          <Popover
            anchorEl={anchorEl}
            onClose={handleClose}
            open={isOpen}
            anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
            slotProps={{
              paper: {
                className: 'bg-[#11161B]',
              },
            }}
          >
            <MenuList className="rounded-md border border-solid border-white-light bg-[#11161B] p-0">
              <MenuItem onClick={() => handleChangeUser('vinicius')}>
                <Avatar className="bg-green-500 uppercase">v</Avatar>
              </MenuItem>
              <MenuItem onClick={() => handleChangeUser('thyelen')}>
                <Avatar className="bg-blue-500">T</Avatar>
              </MenuItem>
            </MenuList>
          </Popover>
        </div>
      </header>
      <main className="pb-4">
        {selectedAreas.map((area) => (
          <div key={area} className="w-full">
            <Typography
              variant="h5"
              className="m-4 font-bold capitalize text-white"
            >
              {area}
            </Typography>
            <div className="flex flex-col items-center">
              {selectedWorkout[area].map((exercise) => (
                <ExerciseItem exercise={exercise} key={exercise.name} />
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
