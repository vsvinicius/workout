import { WorkoutExercise } from '@mock/workout-A';
import { AutoAwesomeMotionOutlined, CachedOutlined } from '@mui/icons-material';
import { Card, Box, Typography, Button, Checkbox } from '@mui/material';
import { useState } from 'react';

export default function ExerciseItem({
  exercise,
}: {
  exercise: WorkoutExercise;
}) {
  const [currentSerie, setCurrentSerie] = useState(() => {
    const value = localStorage.getItem(exercise.name);
    if (!value) return 0;
    return parseInt(value);
  });

  function handleClickNextSerie() {
    localStorage.setItem(exercise.name, `${currentSerie + 1}`);
    setCurrentSerie((prevValue) => prevValue + 1);
  }

  function handleResetExercise(event: React.ChangeEvent<HTMLInputElement>) {
    localStorage.setItem(
      exercise.name,
      `${event.target.checked ? exercise.series : 0}`,
    );
    setCurrentSerie(event.target.checked ? exercise.series : 0);
  }

  return (
    <Card
      elevation={0}
      className="my-4 flex w-[98%] items-center justify-around border border-solid border-white-light bg-[#11161B] px-4 py-2"
    >
      <Box className="w-1/2">
        <Typography className="font-semibold text-[#AFB1B2]">
          {exercise.name}
        </Typography>
        <Box className="flex gap-2">
          <Box className="flex items-center gap-1">
            <AutoAwesomeMotionOutlined className="w-4 text-gray-500" />
            <Typography variant="body2" className="text-[#AFB1B2]">
              {exercise.series}
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
        onClick={handleClickNextSerie}
        disabled={currentSerie === exercise.series}
        sx={{
          '&.Mui-disabled': {
            bgcolor: 'gray',
          },
        }}
      >{`${currentSerie}/${exercise.series}`}</Button>
      <Checkbox
        checked={currentSerie === exercise.series}
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
