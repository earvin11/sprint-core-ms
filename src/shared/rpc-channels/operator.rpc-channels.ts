export enum OperatorRpcChannelsEnum {
  CREATE = 'create-operator',
  FIND_BY_ID = 'operator-by-id',
  FIND_ONE = 'operator-by-filter',
  FIND_ALL = 'find-operators',
  UPDATE = 'update-operator',
  DELETE = 'delete operator',
}

const values = Object.values(OperatorRpcChannelsEnum).filter(
  (v) => typeof v === 'string',
);

export const operatorRpcChannels = [...values];
