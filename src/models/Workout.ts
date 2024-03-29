interface WorkoutInterface {
  id: string;
  name: string;
}

export class Workout implements WorkoutInterface {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
