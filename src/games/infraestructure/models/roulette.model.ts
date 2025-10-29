import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RouletteEntity } from 'src/games/domain/entities/roulette.entity';
import { Game } from './game.model';

@Schema()
export class Roulette extends Game implements RouletteEntity {
  @Prop({ type: Array, default: ['evladimirmartinez@gmail.com'] })
  alertEmails: string[];
  @Prop({ type: Boolean, default: false })
  doubleZero: boolean;
  @Prop({ type: String })
  image: string;
  @Prop({ type: Number })
  number: number;
  @Prop({ type: String, default: 'V1' })
  cameraVersion: string;
  @Prop({ type: Number, default: 1500 })
  initialBank: number;
  @Prop({ type: Boolean, default: false })
  isManualRoulette: boolean;
  @Prop({ type: Boolean, default: false })
  isShow: boolean;
  @Prop({ type: Number, default: 5000 })
  maximunBank: number;
  // maxPlenosBet: { type: Number, Default: 24 },
  @Prop({ type: Number, default: 2 })
  maxRepeatedResults: number;
  // minBet: Number,
  @Prop({ type: Number, Default: 3 })
  minutesToDisable: number;
  @Prop({ type: Array, default: [50, 100, 150, 200, 300, 500, 1000] })
  multisAllowed: number[];
  @Prop({ type: String /*default: NumbersDistributionRoulette.EUROPEAN*/ })
  numbersDistribution: string;
  @Prop({ type: Number })
  numbersOfJackpot: number;
  @Prop({ default: 36 })
  pleno: number;

  @Prop({ default: 18 })
  semipleno: number;

  @Prop({ default: 9 })
  cuadro: number;

  @Prop({ default: 12 })
  calle: number;

  @Prop({ default: 6 })
  linea: number;

  @Prop({ default: 3 })
  columna: number;

  @Prop({ default: 2 })
  docena: number;

  @Prop({ default: 2 })
  chanceSimple: number;

  @Prop({ default: 12 })
  cubre: number;

  @Prop({ default: 7 })
  specialCalle: number;

  // @Prop({ default: 2 })
  // evenOdd: number;

  // @Prop({ default: 2 })
  // color: number;
}

export const RouletteSchema = SchemaFactory.createForClass(Roulette);
