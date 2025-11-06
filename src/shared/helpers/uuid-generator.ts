import { randomUUID } from 'crypto';

export class GenerateId {
  public uuid: string;

  constructor() {
    this.uuid = randomUUID();
  }
}
