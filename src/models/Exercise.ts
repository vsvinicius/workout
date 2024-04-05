import { Type } from 'class-transformer';
import 'reflect-metadata';
interface ExerciseInterface {
  id: string;
  workoutId: string;
  name: string;
  muscleGroup: string;
  reps: string;
  sets: number;
}

export class Exercise implements ExerciseInterface {
  id: string;
  name: string;
  workoutId: string;
  muscleGroup: string;
  reps: string;

  @Type(() => Number)
  sets!: number;

  constructor(
    id: string,
    name: string,
    workoutId: string,
    muscleGroup: string,
    reps: string,
    sets: number,
  ) {
    this.id = id;
    this.name = name;
    this.workoutId = workoutId;
    this.muscleGroup = muscleGroup;
    this.reps = reps;
    this.sets = sets;
  }
  // get formattedSets(): number {
  //   return parseInt(this.sets);
  // }
}
