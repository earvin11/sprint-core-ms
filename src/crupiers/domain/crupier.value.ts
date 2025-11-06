import { GenerateId } from 'src/shared/helpers/uuid-generator';
import { CrupierEntity } from './crupier.entity';

export class Crupier implements CrupierEntity {
  name: string;
  uuid: string;
  serialId?: string;
  photoUrl?: string;

  constructor(data: CrupierEntity) {
    this.name = data.name;
    this.serialId = data.serialId;
    this.uuid = new GenerateId().uuid;
    this.photoUrl = data.photoUrl;
  }
}
