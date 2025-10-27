import { randomUUID } from 'crypto';
import { GameEntity, GameTypes } from '../entities/game.entity';

export class Game implements GameEntity {
  // public type: GameTypes;
  public name: string;
  public providerId: string;
  public active: boolean;
  public urlTransmision: string;
  public logo: string;
  public alwaysOpen: boolean;
  public uuid: string;

  constructor(data: GameEntity) {
    this.active = true;
    this.alwaysOpen = false;
    this.logo = data.logo;
    this.name = data.name;
    this.providerId = data.providerId;
    // this.type = data.type;
    this.urlTransmision = data.urlTransmision;
    this.uuid = randomUUID();
  }
}
