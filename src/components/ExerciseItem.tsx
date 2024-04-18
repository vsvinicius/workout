import { useState } from 'react';
import { Exercise } from '@models/Exercise';
import { AutoAwesomeMotionOutlined, CachedOutlined } from '@mui/icons-material';
import { Card, Box, Typography, Button } from '@mui/material';

export default function ExerciseItem({ exercise }: { exercise: Exercise }) {
  const [currentSet, setCurrentSet] = useState<number>(0);

  function handleClickNextSet() {
    setCurrentSet((prevValue) => Math.min(prevValue + 1, exercise.sets));
  }

  function handleResetExercise() {
    if (currentSet === exercise.sets) setCurrentSet(0);
    else handleClickNextSet();
  }

  return (
    <Card
      elevation={10}
      className="my-3 flex h-32 w-[96%] items-center justify-around border border-solid border-white-light bg-[#2C2C2E] px-6 py-8"
      sx={{
        ...(currentSet === exercise.sets && {
          outline: '2px solid #5cb85c',
          boxShadow:
            '2px 2px 5px rgba(24,197,94,0.25), -2px -2px 5px rgba(24,197,94,0.25)',
        }),
      }}
    >
      <Box
        className="flex h-full w-full flex-col items-start justify-center text-white"
        onClick={handleResetExercise}
      >
        <Typography className="text-lg font-semibold">
          {exercise.name}
        </Typography>
        <Box className="mt-2 flex gap-2">
          <Box className="flex items-center gap-1">
            <AutoAwesomeMotionOutlined className="w-5" />
            <Typography variant="subtitle1">{exercise.sets}</Typography>
          </Box>
          <Box className="flex items-center gap-1">
            <CachedOutlined className="w-5 text-white" />
            <Typography variant="subtitle1">{exercise.reps}</Typography>
          </Box>
        </Box>
      </Box>
      <Button
        variant="contained"
        className="h-16 w-24 text-lg"
        onClick={handleClickNextSet}
        disabled={currentSet === exercise.sets}
        sx={{
          '&.Mui-disabled': {
            bgcolor: 'gray',
          },
        }}
      >{`${currentSet}/${exercise.sets}`}</Button>
    </Card>
  );
}
