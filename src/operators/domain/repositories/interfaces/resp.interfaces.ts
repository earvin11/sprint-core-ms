export interface WithCrupierResp {
  currencies: Currency[];
  layout: boolean;
  template: string;
  logo: string;
  operator: string;
  roulette: Roulette;
  calle: number;
  chanceSimple: number;
  columna: number;
  cuadro: number;
  cubre: number;
  docena: number;
  linea: number;
  pleno: number;
  semipleno: number;
  specialCalle: number;
  roulettefisic: Roulettefisic[];
  crupier: Crupier[];
  order: number;
}

export interface Crupier {
  _id: string;
  name: string;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Currency {
  _id: string;
  name: string;
  short: string;
  symbol: string;
  usdExchange: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  status: boolean;
  exchangeApi: boolean;
  exchangeApiURL: null;
  uuid: string;
}

export interface Roulette {
  _id: string;
  type: string;
  doubleZero: boolean;
  language: string;
  status: boolean;
  lastJackpot: number;
  jackpotRounds: number;
  currenJackpotRound: number;
  jackpotWin: any[];
  rollback: boolean;
  active: boolean;
  manualDisable: boolean;
  jackpotRandom: boolean;
  jackpotVersion: string;
  alertEmails: string[];
  maxRepeatedResults: number;
  multisAllowed: number[];
  isManualRoulette: boolean;
  numbersDistribution: string;
  bank: number;
  isShow: boolean;
  openingTime: string;
  closingTime: string;
  alwaysOpen: boolean;
  cameraVersion: string;
  initialBank: number;
  maximunBank: number;
  name: string;
  logo: string;
  providerId: string;
  pleno: number;
  semipleno: number;
  cuadro: number;
  calle: number;
  linea: number;
  columna: number;
  docena: number;
  chanceSimple: number;
  cubre: number;
  maxBetPosition: number;
  urlTransmision: string;
  roundDuration: number;
  animals: any[];
  maxPlenosBet: number;
}

export interface Roulettefisic {
  _id: string;
  jackpot: boolean;
  doubleZero: boolean;
  timeOne: number;
  timeTwo: number;
  timeThree: number;
  timeFour: number;
  aditionalTime: number;
  timeToReleaseJack: number;
  timeToStartAnimation: number;
  animation: number;
  name: string;
  providerId: string;
  crupier: string;
  urlTransmision: string;
  roundDuration: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
