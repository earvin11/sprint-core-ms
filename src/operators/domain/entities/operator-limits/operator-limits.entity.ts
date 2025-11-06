export interface OperatorLimitsEntity {
  currency: string;
  operator: string;
  game: string;
  short: string;
  minBet: number;
  maxBet: number;
  maxBetPosition: number;
  uuid?: string;
}

export enum OperatorLimitsTypesEnum {
  ROULETTE = 'op_lm_roulette',
  WHEEL = 'op_lm_wheel',
}
