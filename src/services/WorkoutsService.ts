import { Workout } from '@models/Workout';
import HttpClient from './utils/HttpClient';
import { plainToInstance } from 'class-transformer';

class WorkoutsService {
  private requestPath: string;
  private httpClient: HttpClient;

  constructor() {
    this.requestPath = 'workouts';
    this.httpClient = new HttpClient();
  }

  async getWorkouts(userId: string): Promise<Workout[]> {
    const response = await this.httpClient.get(
      `${this.requestPath}/users/${userId}`,
    );
    return plainToInstance(Workout, response.data);
  }
}

export default new WorkoutsService();
