import { Exercise } from '@models/Exercise';
import { CircularProgress, Typography } from '@mui/material';
import ExercisesService from '@services/ExercisesService';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import ExerciseItem from './ExerciseItem';
import { RESTING_TIME_KEY } from '@components/Header';

interface ExerciseListProps {
  workoutId: string;
}

export default function ExerciseList({ workoutId }: ExerciseListProps) {
  const { data: exercises, isLoading } = useQuery({
    queryKey: [`workout-exercises-${workoutId}`],
    queryFn: () => ExercisesService.getWorkoutExercises(workoutId),
  });

  const exerciseByMuscleGroups = useMemo(() => {
    return exercises?.reduce(
      (prev, curr) => {
        if (!prev[curr.muscleGroup]) {
          prev[curr.muscleGroup] = [curr];
        } else {
          prev[curr.muscleGroup] = [...prev[curr.muscleGroup], curr];
        }
        return prev;
      },
      {} as Record<string, Exercise[]>,
    );
  }, [exercises]);

  const muscleGroups = Object.keys(exerciseByMuscleGroups || {});

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return muscleGroups.map((group) => (
    <div key={group} className="mt-2 w-full">
      <Typography variant="h5" className="m-4 font-bold capitalize text-white">
        {group}
      </Typography>
      <div className="flex flex-col items-center">
        {exerciseByMuscleGroups?.[group].map((exercise) => (
          <ExerciseItem
            exercise={exercise}
            key={`${exercise.id}-${localStorage.getItem(RESTING_TIME_KEY)}`}
          />
        ))}
      </div>
    </div>
  ));
}
