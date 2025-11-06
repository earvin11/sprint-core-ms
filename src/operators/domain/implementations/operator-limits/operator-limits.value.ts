import { randomUUID } from 'crypto';
import { OperatorLimitsEntity } from '../../entities/operator-limits/operator-limits.entity';

export class OperatorLimits implements OperatorLimitsEntity {
  public currency: string;
  public operator: string;
  public game: string;
  public short: string;
  public minBet: number;
  public maxBet: number;
  public maxBetPosition: number;
  public uuid: string;

  constructor(data: OperatorLimitsEntity) {
    this.currency = data.currency;
    this.game = data.game;
    this.maxBet = data.maxBet;
    this.maxBetPosition = data.maxBetPosition;
    this.minBet = data.minBet;
    this.operator = data.operator;
    this.short = data.short;
    this.uuid = randomUUID();
  }
}
