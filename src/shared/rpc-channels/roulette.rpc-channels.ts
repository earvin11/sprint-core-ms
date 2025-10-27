export enum RouletteRpcChannelsEnum {
  CREATE = 'create-roulette',
  FIND_BY_ID = 'roulette-by-id',
  FIND_ONE = 'roulette-by-filter',
  FIND_ALL = 'find-roulettes',
  UPDATE = 'update-roulette',
  DELETE = 'delete roulette',
}

const values = Object.values(RouletteRpcChannelsEnum).filter(
  (v) => typeof v === 'string',
);

export const rouletteRpcChannels = [...values];
