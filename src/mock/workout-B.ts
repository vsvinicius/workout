import { WorkoutAreas, WorkoutExercise } from './workout-A';

export const workoutB: Record<WorkoutAreas, WorkoutExercise[]> = {
  dorsais: [
    {
      name: 'Puxador F.',
      reps: 12,
      series: 4,
    },
    {
      name: 'Remada Sentada',
      reps: 12,
      series: 4,
    },
    {
      name: 'Remo',
      reps: 12,
      series: 4,
    },
    {
      name: 'Pull Down',
      reps: 12,
      series: 4,
    },
  ],
  biceps: [
    {
      name: 'Rosca Direta',
      reps: 12,
      series: 4,
    },
    {
      name: 'Rosca Concentrada',
      reps: 12,
      series: 4,
    },
    {
      name: 'Rosca Inversa',
      reps: 12,
      series: 4,
    },
  ],
  ombro: [
    {
      name: 'Remada Alta',
      reps: 12,
      series: 4,
    },
  ],
  abdomen: [
    {
      name: 'Infra',
      reps: 12,
      series: 4,
    },
  ],
  peito: [],
  triceps: [],
  perna: [],
};
