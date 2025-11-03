import { OperatorGameEntity } from './operator-game.entity';

export interface OperatorWheelEntity extends OperatorGameEntity {
  configPayment: ConfigPayment[];
}

export interface ConfigPayment {
  optionBet: string;
  pay: number;
}
