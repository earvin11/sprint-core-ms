const prefix = 'game';
export enum GameRpcChannelsEnum {
  CREATE = `${prefix}-create`,
  FIND_ALL = `${prefix}-all`,
  FIND_BY_ID = `${prefix}-by-id`,
  FIND_ONE = `${prefix}-find-by`,
  UPDATE = `${prefix}-update`,
  DELETE = `${prefix}-delete`,
}

const values = Object.values(GameRpcChannelsEnum).filter(
  (v) => typeof v === 'string',
);

export const gameRpcChannels = [...values];
