import { Type } from 'class-transformer';
import 'reflect-metadata';
import { PersonalRecord } from './PersonalRecord';
interface ExerciseInterface {
  id: string;
  workoutId: string;
  name: string;
  muscleGroup: string;
  lastPersonalRecord: PersonalRecord | null;
  reps: string;
  sets: number;
}

export class Exercise implements ExerciseInterface {
  id: string;
  name: string;
  workoutId: string;
  muscleGroup: string;
  reps: string;
  lastPersonalRecord: PersonalRecord | null;

  @Type(() => Number)
  sets!: number;

  constructor(
    id: string,
    name: string,
    workoutId: string,
    muscleGroup: string,
    reps: string,
    sets: number,
    lastPersonalRecord: PersonalRecord | null,
  ) {
    this.id = id;
    this.name = name;
    this.workoutId = workoutId;
    this.muscleGroup = muscleGroup;
    this.reps = reps;
    this.sets = sets;
    this.lastPersonalRecord = lastPersonalRecord;
  }
}
