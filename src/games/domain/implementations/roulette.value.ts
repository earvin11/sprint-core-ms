import { randomUUID } from 'crypto';
import { GameTypes } from '../entities/game.entity';
import { RouletteEntity } from '../entities/roulette.entity';

export class Roulette implements RouletteEntity {
  public alertEmails?: string[];
  public initialBank?: number;
  public isManualRoulette?: boolean;
  public isShow?: boolean;
  public maximunBank?: number;
  public maxRepeatedResults?: number;
  public minutesToDisable?: number;
  public multisAllowed?: number[];
  public numbersDistribution?: string;
  public type: GameTypes;
  public active: boolean;
  public alwaysOpen: boolean;
  public logo: string;
  public name: string;
  public providerId: string;
  public urlTransmision: string;
  public uuid?: string;

  constructor(data: RouletteEntity) {
    this.alertEmails = data.alertEmails;
    this.initialBank = data.initialBank;
    this.isManualRoulette = data.isManualRoulette;
    this.isShow = data.isShow;
    this.maximunBank = data.maximunBank;
    this.maxRepeatedResults = data.maxRepeatedResults;
    this.minutesToDisable = data.minutesToDisable;
    this.multisAllowed = data.multisAllowed;
    this.numbersDistribution = data.numbersDistribution;
    this.type = data.type;
    this.active = true;
    this.alwaysOpen = data.alwaysOpen;
    this.logo = data.logo;
    this.name = data.name;
    this.providerId = data.providerId;
    this.urlTransmision = data.urlTransmision;
    this.uuid = randomUUID();
  }
}
