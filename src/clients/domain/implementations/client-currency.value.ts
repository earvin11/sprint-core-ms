import { ClientCurrencyEntity } from '../entities/client-currency.entity';

export class ClientCurrency implements ClientCurrencyEntity {
  public client: string;
  public currency: string;

  constructor(data: ClientCurrencyEntity) {
    this.client = data.client;
    this.currency = data.currency;
  }
}
