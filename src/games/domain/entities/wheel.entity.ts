import { GameEntity } from './game.entity';

export interface WheelEntity extends GameEntity {
  aditionalTime?: number;
  betPays: Array<{ number: number; multiplier: number }>;
  // betPays: Object;
  maxBetFigures?: number;
  timeOne?: number;
  timeTwo?: number;
  timeTrhee?: number;
  percentReturnToPlayer?: number;
}
