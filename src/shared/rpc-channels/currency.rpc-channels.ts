export enum CurrencyRpcChannelsEnum {
  CREATE = 'create-currency',
  FIND_BY_ID = 'currency-by-id',
  FIND_ONE = 'currency-by-filter',
  FIND_ALL = 'find-currencies',
  UPDATE = 'update-currency',
  DELETE = 'delete currency',
}

const values = Object.values(CurrencyRpcChannelsEnum).filter(
  (v) => typeof v === 'string',
);

export const currencyRpcChannels = [...values];
