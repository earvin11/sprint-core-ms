import { OperatorLimitsEntity } from './operator-limits.entity';

export interface OperatorLimitsRouletteEntity extends OperatorLimitsEntity {
  pleno: LimitBet;
  semipleno: LimitBet;
  cuadro: LimitBet;
  calle: LimitBet;
  linea: LimitBet;
  columna: LimitBet;
  docena: LimitBet;
  cubre: LimitBet;
  chanceSimple: LimitBet;
  even_odd: LimitBet;
  color: LimitBet;
  specialCalle: LimitBet;
}

export interface LimitBet {
  min: number;
  max: number;
}
