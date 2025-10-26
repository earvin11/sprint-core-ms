import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RouletteEntity } from 'src/games/domain/entities/roulette.entity';
import { Game } from './game.model';

@Schema()
export class Roulette extends Game implements RouletteEntity {
  @Prop()
  jackpotRandom: boolean;
  @Prop()
  jackpotVersion: string;
  @Prop()
  alertEmails: string[];
  @Prop()
  maxRepeatedResults: number;
  @Prop()
  multisAllowed: number[];
  @Prop()
  isManualRoulette: boolean;
  @Prop()
  numbersDistribution: string;
  @Prop()
  bank: number;
  @Prop()
  isShow: boolean;
  @Prop()
  openingTime: string;
  @Prop()
  closingTime: string;
  @Prop()
  initialBank: number;
  @Prop()
  maximunBank: number;
  @Prop()
  pleno: number;
  @Prop()
  semipleno: number;
  @Prop()
  cuadro: number;
  @Prop()
  calle: number;
  @Prop()
  linea: number;
  @Prop()
  columna: number;
  @Prop()
  docena: number;
  @Prop()
  chanceSimple: number;
  @Prop()
  cubre: number;
  @Prop()
  specialCalle: number;
  @Prop()
  minBet: number;
  @Prop()
  maxBet: number;
  @Prop()
  minutesToDisable: number;
  @Prop()
  maxPlenosBet: number;
  @Prop()
  numbersOfJackpot: number;
  @Prop()
  saveRecordings: boolean;
}

export const RouletteSchema = SchemaFactory.createForClass(Roulette);
