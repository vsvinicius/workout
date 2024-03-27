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

export const workoutAVini: Record<WorkoutAreas, WorkoutExercise[]> = {
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
export const workoutAThy: Record<WorkoutAreas, WorkoutExercise[]> = {
  perna: [
    {
      name: 'Leg Press 45°',
      reps: 12,
      series: 4,
    },
    {
      name: 'Hack',
      reps: 12,
      series: 4,
    },
    {
      name: 'Cadeira Extensora',
      reps: 12,
      series: 4,
    },
    {
      name: 'Agachamento',
      reps: 12,
      series: 4,
    },
    {
      name: 'Afundo',
      reps: 12,
      series: 4,
    },
  ],
  ombro: [
    {
      name: 'Desenvolvimento Máquina',
      reps: 12,
      series: 4,
    },
    {
      name: 'Elevação Lateral',
      reps: 12,
      series: 4,
    },
    {
      name: 'Elevação Frontal',
      reps: 12,
      series: 4,
    },
  ],
  abdomen: [
    {
      name: 'Supra',
      reps: 12,
      series: 4,
    },
  ],
  peito: [],
  triceps: [],
  dorsais: [],
  biceps: [],
};
