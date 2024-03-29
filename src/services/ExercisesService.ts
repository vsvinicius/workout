import HttpClient from './utils/HttpClient';
import { plainToInstance } from 'class-transformer';
import { Exercise } from '@models/Exercise';

class ExercisesService {
  private requestPath: string;
  private httpClient: HttpClient;

  constructor() {
    this.requestPath = 'exercises';
    this.httpClient = new HttpClient();
  }

  async getWorkoutExercises(workoutId: string): Promise<Exercise[]> {
    const response = await this.httpClient.get(
      `${this.requestPath}/workout/${workoutId}`,
    );
    return plainToInstance(Exercise, response.data);
  }
}

export default new ExercisesService();
