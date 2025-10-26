export enum ClientRpcChannelsEnum {
  CREATE = 'create-client',
  FIND_BY_ID = 'client-by-id',
  FIND_ONE = 'client-by-filter',
  FIND_ALL = 'find-clients',
  UPDATE = 'update-client',
  DELETE = 'delete client',
}

const values = Object.values(ClientRpcChannelsEnum).filter(
  (v) => typeof v === 'string',
);

export const clientRpcChannels = [...values];
