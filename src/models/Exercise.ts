interface ExerciseInterface {
  id: string;
  workoutId: string;
  name: string;
  muscleGroup: string;
  reps: string;
  sets: string;
}

export class Exercise implements ExerciseInterface {
  id: string;
  name: string;
  workoutId: string;
  muscleGroup: string;
  reps: string;
  sets: string;

  constructor(
    id: string,
    name: string,
    workoutId: string,
    muscleGroup: string,
    reps: string,
    sets: string,
  ) {
    this.id = id;
    this.name = name;
    this.workoutId = workoutId;
    this.muscleGroup = muscleGroup;
    this.reps = reps;
    this.sets = sets;
  }
}
