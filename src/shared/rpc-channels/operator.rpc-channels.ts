export enum OperatorRpcChannelsEnum {
  CREATE = 'create-operator',
  FIND_BY_ID = 'operator-by-id',
  FIND_ONE = 'operator-by-filter',
  FIND_ALL = 'find-operators',
  UPDATE = 'update-operator',
  DELETE = 'delete operator',
  ASSIGN_GAME = 'assign-game',
}

export enum OperatorLimitsRpcChannelsEnum {
  CREATE = 'operator-limit-create',
}

const values = Object.values(OperatorRpcChannelsEnum).filter(
  (v) => typeof v === 'string',
);

const valuesOpLimit = Object.values(OperatorRpcChannelsEnum).filter(
  (v) => typeof v === 'string',
);

export const operatorRpcChannels = [...values];
export const operatorLimitsRpcChannels = [...valuesOpLimit];
