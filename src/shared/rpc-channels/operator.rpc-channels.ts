export enum OperatorRpcChannelsEnum {
  CREATE = 'create-operator',
  FIND_BY_ID = 'operator-by-id',
  FIND_ONE = 'operator-by-filter',
  FIND_ALL = 'find-operators',
  UPDATE = 'update-operator',
  DELETE = 'delete operator',
}

const prefixOpGame = 'operator-game';
export enum OperatorGameRpcChannelsEnum {
  CREATE = `${prefixOpGame}-create`,
  FIND_ALL = `${prefixOpGame}-all`,
  FIND_BY_ID = `${prefixOpGame}-by-id`,
  FIND_BY_OPERATOR = `${prefixOpGame}-find-by-operator`,
  FIND_BY_OPERATOR_GAME = `${prefixOpGame}-find-by-operator-game`,
  UPDATE_BY_OPERATOR_GAME = `${prefixOpGame}-update-by-operator-game`,
  DELETE = `${prefixOpGame}-delete`,
}

const prefixOpLimit = 'operator-limits';
export enum OperatorLimitsRpcChannelsEnum {
  CREATE = `${prefixOpLimit}-create`,
  FIND_ALL = `${prefixOpLimit}-all`,
  FIND_BY_ID = `${prefixOpLimit}-by-id`,
  FIND_BY_OPERATOR = `${prefixOpLimit}-find-by-operator`,
  FIND_BY_OPERATOR_CURRENCY = `${prefixOpLimit}-find-by-operator-currency`,
  UPDATE_BY_OPERATOR_CURRENCY = `${prefixOpLimit}-update-by-operator-currency`,
  DELETE = `${prefixOpLimit}-delete`,
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
