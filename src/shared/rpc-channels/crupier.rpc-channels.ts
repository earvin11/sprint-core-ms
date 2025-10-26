export enum CrupierRpcChannelsEnum {
  CREATE = 'create-crupier',
  FIND_BY_ID = 'crupier-by-id',
  FIND_ONE = 'crupier-by-filter',
  FIND_ALL = 'find-crupiers',
  UPDATE = 'update-crupier',
  DELETE = 'delete crupier',
}

const values = Object.values(CrupierRpcChannelsEnum).filter(
  (v) => typeof v === 'string',
);

export const crupierRpcChannels = [...values];
