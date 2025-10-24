import { CrupierEntity } from './crupier.entity';
import { randomUUID } from 'crypto';

export class Crupier implements CrupierEntity {
  name: string;
  uuid: string;
  serialId?: string;
  photoUrl?: string;

  constructor(data: CrupierEntity) {
    this.name = data.name;
    this.serialId = data.serialId;
    this.uuid = randomUUID();
    this.photoUrl = data.photoUrl;
  }
}
