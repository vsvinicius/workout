import { useState } from 'react';
import { Exercise } from '@models/Exercise';
import { AutoAwesomeMotionOutlined, CachedOutlined } from '@mui/icons-material';
import { Card, Box, Typography, Button, Checkbox } from '@mui/material';

export default function ExerciseItem({ exercise }: { exercise: Exercise }) {
  const [currentSet, setCurrentSet] = useState<number>(() => {
    const value = localStorage.getItem(exercise.name);
    if (!value) return 0;
    return parseInt(value, 10);
  });

  function handleClickNextSet() {
    localStorage.setItem(exercise.name, `${currentSet + 1}`);
    setCurrentSet((prevValue) => prevValue + 1);
  }

  function handleResetExercise(event: React.ChangeEvent<HTMLInputElement>) {
    localStorage.setItem(
      exercise.name,
      `${event.target.checked ? exercise.sets : 0}`,
    );

    setCurrentSet(event.target.checked ? exercise.sets : 0);
  }
  return (
    <Card
      elevation={0}
      className="my-4 flex w-[98%] items-center justify-around border border-solid border-white-light bg-[#2C2C2E] px-4 py-2"
    >
      <Box className="w-1/2">
        <Typography className="font-semibold text-[#AFB1B2]">
          {exercise.name}
        </Typography>
        <Box className="flex gap-2">
          <Box className="flex items-center gap-1">
            <AutoAwesomeMotionOutlined className="w-4 text-gray-500" />
            <Typography variant="body2" className="text-[#AFB1B2]">
              {exercise.sets}
            </Typography>
          </Box>
          <Box className="flex items-center gap-1">
            <CachedOutlined className="w-4 text-gray-500" />
            <Typography variant="body2" className="text-[#AFB1B2]">
              {exercise.reps}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Button
        variant="contained"
        onClick={handleClickNextSet}
        disabled={currentSet === exercise.sets}
        sx={{
          '&.Mui-disabled': {
            bgcolor: 'gray',
          },
        }}
      >{`${currentSet}/${exercise.sets}`}</Button>
      <Checkbox
        checked={currentSet === exercise.sets}
        color="success"
        onChange={handleResetExercise}
        sx={{
          color: 'white',
          '&.Mui-checked': {
            color: '#5cb85c',
          },
        }}
      />
    </Card>
  );
}
