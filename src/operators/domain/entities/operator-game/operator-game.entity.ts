export interface OperatorGameEntity {
  operator: string;
  game: string;
  uuid?: string;
  currencies: string[];
  order?: number;
}

export enum OperatorGameTypesEnum {
  OP_ROULETTE = 'op_roulette',
  OP_WHEEL = 'op_wheel',
}
