import { randomUUID } from 'crypto';
import { CurrencyEntity } from './currency.entity';

export class Currency implements CurrencyEntity {
  public name: string;
  public short: string;
  public symbol: string;
  public usdExchange: number;
  public exchangeApi: boolean;
  public status: boolean;
  public uuid: string;

  constructor(data: CurrencyEntity) {
    this.name = data.name;
    this.short = data.short;
    this.symbol = data.symbol;
    this.usdExchange = data.usdExchange;
    this.exchangeApi = data.exchangeApi;
    this.status = true;
    this.uuid = randomUUID();
  }
}
