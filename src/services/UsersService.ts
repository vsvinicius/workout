import { User } from '@models/User';
import HttpClient from './utils/HttpClient';
import { plainToInstance } from 'class-transformer';

class UsersService {
  requestPath: string;
  httpClient: HttpClient;

  constructor() {
    this.requestPath = 'users';
    this.httpClient = new HttpClient();
  }

  async getUsers(): Promise<User[]> {
    const response = await this.httpClient.get(this.requestPath);
    return plainToInstance(User, response.data);
  }
}

export default new UsersService();
