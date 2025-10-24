export interface CurrencyEntity {
  name: string;
  short: string;
  symbol: string;
  usdExchange: number;
  exchangeApi: boolean;
  status?: boolean;
  uuid?: string;
}
