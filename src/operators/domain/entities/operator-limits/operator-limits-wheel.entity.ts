import { OperatorLimitsEntity } from './operator-limits.entity';

export interface OperatorLimitsWheelEntity extends OperatorLimitsEntity {
  figures: FiguresLimits[];
}

export interface FiguresLimits {
  figure: number;
  minBet: number;
  maxBet: number;
}
