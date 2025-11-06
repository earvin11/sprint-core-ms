import { randomUUID } from 'crypto';
import {
  FiguresLimits,
  OperatorLimitsWheelEntity,
} from '../../entities/operator-limits/operator-limits-wheel.entity';

export class OperatorLimitsWheel implements OperatorLimitsWheelEntity {
  public figures: FiguresLimits[];
  public currency: string;
  public operator: string;
  public game: string;
  public short: string;
  public minBet: number;
  public maxBet: number;
  public maxBetPosition: number;
  public uuid: string;

  constructor(data: OperatorLimitsWheel) {
    this.currency = data.currency;
    this.figures = data.figures;
    this.game = data.game;
    this.maxBet = data.maxBet;
    this.maxBetPosition = data.maxBetPosition;
    this.minBet = data.minBet;
    this.operator = data.operator;
    this.short = data.short;
    this.uuid = randomUUID();
  }
}
