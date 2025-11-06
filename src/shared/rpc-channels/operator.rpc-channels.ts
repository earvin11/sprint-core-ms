export enum OperatorRpcChannelsEnum {
  CREATE = 'create-operator',
  FIND_BY_ID = 'operator-by-id',
  FIND_ONE = 'operator-by-filter',
  FIND_ALL = 'find-operators',
  UPDATE = 'update-operator',
  DELETE = 'delete operator',
}

export enum OperatorGameRpcChannelsEnum {
  ASSIGN_GAME = 'assign-game',
}

export enum OperatorLimitsRpcChannelsEnum {
  CREATE = 'operator-limit-create',
}

const values = Object.values(OperatorRpcChannelsEnum).filter(
  (v) => typeof v === 'string',
);

const valuesOpGame = Object.values(OperatorGameRpcChannelsEnum).filter(
  (v) => typeof v === 'string',
);

const valuesOpLimit = Object.values(OperatorLimitsRpcChannelsEnum).filter(
  (v) => typeof v === 'string',
);

export const operatorRpcChannels = [...values];
export const operatorGameRpcChannels = [...valuesOpGame];
export const operatorLimitsRpcChannels = [...valuesOpLimit];
