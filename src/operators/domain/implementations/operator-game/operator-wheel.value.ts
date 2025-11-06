import {
  ConfigPayment,
  OperatorWheelEntity,
} from '../../entities/operator-game/operator-wheel.entity';
import { GenerateId } from 'src/shared/helpers/uuid-generator';

export class OperatorWheel implements OperatorWheelEntity {
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
    this.uuid = new GenerateId().uuid;
    this.currencies = data.currencies;
    this.order = data.order;
  }
}
