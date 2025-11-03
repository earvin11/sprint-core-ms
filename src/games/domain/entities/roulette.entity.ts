import { GameEntity } from './game.entity';

export interface RouletteEntity extends GameEntity {
  alertEmails?: string[];
  calle?: number;
  chanceSimple?: number;
  columna?: number;
  cuadro?: number;
  cubre?: number;
  docena?: number;
  initialBank?: number;
  isManualRoulette?: boolean;
  isShow?: boolean;
  // jackpotRandom: boolean;
  // jackpotVersion: string;
  linea?: number;
  // maxBet?: number;
  maximunBank?: number;
  // maxPlenosBet: number;
  maxRepeatedResults?: number;
  // minBet: number;
  minutesToDisable?: number;
  multisAllowed?: number[];
  numbersDistribution?: string;
  // numbersOfJackpot: number;
  pleno?: number;
  saveRecordings?: boolean;
  semipleno?: number;
  specialCalle?: number;
}
