import { randomUUID } from 'crypto';
import { GameTypes } from '../entities/game.entity';
import { WheelEntity } from '../entities/wheel.entity';

export class Wheel implements WheelEntity {
  public aditionalTime?: number | undefined;
  public betPays: Array<{ number: number; multiplier: number }>;
  //   public betPays: Object;
  public maxBetFigures?: number | undefined;
  public timeOne?: number | undefined;
  public timeTwo?: number | undefined;
  public timeTrhee?: number | undefined;
  public percentReturnToPlayer?: number | undefined;
  public type: GameTypes;
  public name: string;
  public providerId: string;
  public active?: boolean | undefined;
  public urlTransmision: string;
  public logo: string;
  public alwaysOpen: boolean;
  public uuid?: string | undefined;

  constructor(data: WheelEntity) {
    this.aditionalTime = data.aditionalTime;
    this.betPays = data.betPays;
    this.maxBetFigures = data.maxBetFigures;
    this.timeOne = data.timeOne;
    this.timeTwo = data.timeTwo;
    this.timeTrhee = data.timeTrhee;
    this.percentReturnToPlayer = data.percentReturnToPlayer;
    // this.type = data.type;
    this.name = data.name;
    this.providerId = data.providerId;
    this.active = true;
    this.urlTransmision = data.urlTransmision;
    this.logo = data.logo;
    this.alwaysOpen = data.alwaysOpen;
    this.uuid = randomUUID();
  }
}
