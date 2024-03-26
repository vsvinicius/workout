import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { WorkoutAreas, workoutA } from '@mock/workout-A';

import { workoutB } from '@mock/workout-B';
import { workoutC } from '@mock/workout-C';

import ExerciseItem from '@components/ExerciseItem';
import { useMemo, useState } from 'react';

type WorkoutType = 'a' | 'b' | 'c';
const WORKOUTS = {
  a: workoutA,
  b: workoutB,
  c: workoutC,
};
export default function Main() {
  const [workout, setWorkout] = useState<WorkoutType>('a');
  const selectedWorkout = useMemo(() => WORKOUTS[workout], [workout]);
  const selectedAreas = useMemo(() => {
    const areas = Object.keys(WORKOUTS[workout]) as WorkoutAreas[];
    return areas.filter((area) => WORKOUTS[workout][area].length > 0);
  }, [workout]);

  function handleChangeWorkout(event: SelectChangeEvent) {
    setWorkout(event.target.value as WorkoutType);
  }

  return (
    <div className="h-full w-full bg-[#101418]" style={{ minHeight: '100vh' }}>
      <header className="flex w-full items-center justify-center pt-10">
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
