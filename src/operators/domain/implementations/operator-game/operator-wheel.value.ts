import { randomUUID } from 'crypto';
import {
  ConfigPayment,
  OperatorWheelEntity,
} from '../../entities/operator-game/operator-wheel.entity';

export class OperatorWheeel implements OperatorWheelEntity {
  public configPayment: ConfigPayment[];
  public operator: string;
  public game: string;
  public uuid: string;
  public currencies: string[];
  public order?: number;

  constructor(data: OperatorWheelEntity) {
    this.configPayment = data.configPayment;
    this.operator = data.operator;
    this.game = data.game;
    this.uuid = randomUUID();
    this.currencies = data.currencies;
    this.order = data.order;
  }
}
