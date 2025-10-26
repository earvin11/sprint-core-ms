import { OperatorCurrencyEntity } from '../entities/operator-currency.entity';

export class OperatorCurrency implements OperatorCurrencyEntity {
  public operator: string;
  public currency: string;

  constructor(data: OperatorCurrencyEntity) {
    this.operator = data.operator;
    this.currency = data.currency;
  }
}
