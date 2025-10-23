export interface CurrencyEntity {
  _id?: string;
  name: string;
  short: string;
  symbol: string;
  usdExchange: number;
  //   exchangeApiURL: string;
  exchangeApi: boolean;
  status?: boolean;
  uuid?: string;
}
