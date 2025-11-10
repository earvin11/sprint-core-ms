export enum PlayerRpcChannelsEnum {
  CREATE = 'create-player',
  FIND_BY_ID = 'player-by-id',
  FIND_ONE = 'player-by-filter',
  FIND_ALL = 'find-players',
  UPDATE = 'update-player',
  DELETE = 'delete player',
}

const values = Object.values(PlayerRpcChannelsEnum).filter(
  (v) => typeof v === 'string',
);

export const playerRpcChannels = [...values];
