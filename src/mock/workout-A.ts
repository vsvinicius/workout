export type WorkoutAreas =
  | 'peito'
  | 'triceps'
  | 'ombro'
  | 'dorsais'
  | 'perna'
  | 'abdomen'
  | 'biceps';

export type WorkoutExercise = {
  name: string;
  reps: number;
  series: number;
};

export const workoutA: Record<WorkoutAreas, WorkoutExercise[]> = {
  peito: [
    {
      name: 'Supino Máquina',
      reps: 12,
      series: 4,
    },
    {
      name: 'Fly',
      reps: 12,
      series: 4,
    },
    {
      name: 'Peck Deck',
      reps: 12,
      series: 4,
    },
  ],
  triceps: [
    {
      name: 'Pulley',
      reps: 12,
      series: 4,
    },
    {
      name: 'Francês',
      reps: 12,
      series: 4,
    },
    {
      name: 'Banco Mergulho',
      reps: 12,
      series: 4,
    },
  ],
  ombro: [
    {
      name: 'Desenvolvimento',
      reps: 12,
      series: 4,
    },
    {
      name: 'Elevação lateral',
      reps: 12,
      series: 4,
    },
    {
      name: 'Elevação frontal',
      reps: 12,
      series: 4,
    },
  ],
  dorsais: [],
  perna: [],
  abdomen: [],
  biceps: [],
};
