import { randomUUID } from 'crypto';
import {
  LimitBet,
  OperatorLimitsRouletteEntity,
} from '../../entities/operator-limits/operator-limits-roulette.entity';

export class OperatorLimitsRoulette implements OperatorLimitsRouletteEntity {
  public pleno: LimitBet;
  public semipleno: LimitBet;
  public cuadro: LimitBet;
  public calle: LimitBet;
  public linea: LimitBet;
  public columna: LimitBet;
  public docena: LimitBet;
  public cubre: LimitBet;
  public chanceSimple: LimitBet;
  public even_odd: LimitBet;
  public color: LimitBet;
  public specialCalle: LimitBet;
  public currency: string;
  public operator: string;
  public game: string;
  public short: string;
  public minBet: number;
  public maxBet: number;
  public maxBetPosition: number;
  public uuid?: string;

  constructor(data: OperatorLimitsRoulette) {
    this.calle = data.calle;
    this.chanceSimple = data.chanceSimple;
    this.color = data.color;
    this.columna = data.columna;
    this.cuadro = data.cuadro;
    this.cubre = data.cubre;
    this.currency = data.currency;
    this.docena = data.docena;
    this.even_odd = data.even_odd;
    this.game = data.game;
    this.linea = data.linea;
    this.maxBet = data.maxBet;
    this.maxBetPosition = data.maxBetPosition;
    this.minBet = data.minBet;
    this.operator = data.operator;
    this.pleno = data.pleno;
    this.semipleno = data.semipleno;
    this.short = data.short;
    this.specialCalle = data.specialCalle;
    this.uuid = randomUUID();
  }
}
