import HttpClient from './utils/HttpClient';
import { PersonalRecordForm } from '@models/PersonalRecord';

class PersonalRecordsService {
  private requestPath: string;
  private httpClient: HttpClient;

  constructor() {
    this.requestPath = 'personal-records';
    this.httpClient = new HttpClient();
  }

  async create(personalRecordForm: PersonalRecordForm) {
    const { exerciseId, unit, weight } = personalRecordForm;
    await new Promise<void>((resolve) =>
      setTimeout(() => {
        resolve();
      }, 3000),
    );
    return this.httpClient.post(this.requestPath, {
      data: {
        exerciseId,
        unit,
        weight,
      },
    });
  }

  update({ id, unit }: { id: string; unit: string }) {
    return this.httpClient.patch(`${this.requestPath}/${id}`, {
      data: {
        unit,
      },
    });
  }
}

export default new PersonalRecordsService();
