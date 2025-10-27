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
  // Apuestas específicas de ruleta
  @Prop({ type: Number })
  calle: number;
  @Prop({ type: String, default: 'V1' })
  cameraVersion: string;
  // chanceSimple: Number,
  @Prop({ type: Number, default: 1500 })
  initialBank: number;
  @Prop({ type: Boolean, default: false })
  isManualRoulette: boolean;
  @Prop({ type: Boolean, default: false })
  isShow: boolean;
  // linea: Number,
  // maxBet: Number,
  // maxBetOutside: Number,
  // maxBetPosition: Number,
  // maxBetWhitin: Number,
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
  // pleno: Number,
  // semipleno: Number
  // specialCalle: Number,
}

export const RouletteSchema = SchemaFactory.createForClass(Roulette);
