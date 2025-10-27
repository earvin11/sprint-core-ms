export enum WheelRpcChannelsEnum {
  CREATE = 'create-wheel',
  FIND_BY_ID = 'wheel-by-id',
  FIND_ONE = 'wheel-by-filter',
  FIND_ALL = 'find-wheels',
  UPDATE = 'update-wheel',
  DELETE = 'delete wheel',
}

const values = Object.values(WheelRpcChannelsEnum).filter(
  (v) => typeof v === 'string',
);

export const wheelRpcChannels = [...values];
