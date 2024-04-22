import { Type } from 'class-transformer';
import 'reflect-metadata';

interface PersonalRecordInterface {
  id: string;
  exerciseId: string;
  weight: string;
  unit: string;
  createdAt: Date;
}

export interface PersonalRecordForm {
  exerciseId: string;
  weight: string;
  unit: string;
}

export class PersonalRecord implements PersonalRecordInterface {
  id: string;
  exerciseId: string;
  weight: string;
  unit: string;

  @Type(() => Date)
  createdAt: Date;

  constructor(
    id: string,
    exerciseId: string,
    weight: string,
    unit: string,
    createdAt: Date,
  ) {
    this.id = id;
    this.exerciseId = exerciseId;
    this.weight = weight;
    this.unit = unit;
    this.createdAt = createdAt;
  }
}
