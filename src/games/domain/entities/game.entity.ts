export interface GameEntity {
  type: GameTypes;
  name: string;
  providerId: string;
  active?: boolean;
  urlTransmision: string;
  logo: string;
  alwaysOpen: boolean;
  uuid?: string;
}

export enum GameTypes {
  ROULETTE = 'roulette',
  WHEEL = 'wheel',
}
