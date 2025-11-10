export interface PlayerEntity {
  userId: string;
  username: string;
  operator: string;
  currency: string;
  lastBalance: string;
  status?: boolean;
  isAdmin?: boolean;
  isPhysic?: boolean;
  board?: boolean;
  tokenWallet: string;
  WL: string;
  // operatorUuid: string;
}
