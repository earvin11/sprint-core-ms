import { PlayerEntity } from '../entities/player.entity';

export class Player implements PlayerEntity {
  public userId: string;
  public username: string;
  public operator: string;
  // public operatorUuid: string;
  public currency: string;
  public lastBalance: string;
  public status?: boolean;
  public isAdmin?: boolean;
  public isPhysic?: boolean;
  public board?: boolean;
  public tokenWallet: string;
  public WL: string;

  constructor(data: PlayerEntity) {
    this.status = true;
    this.userId = data.userId;
    this.username = data.username;
    this.operator = data.operator;
    // this.operatorUuid = data.operatorUuid;
    this.currency = data.currency;
    this.lastBalance = data.lastBalance;
    this.status = data.status;
    this.isAdmin = data.isAdmin;
    this.isPhysic = data.isPhysic;
    this.board = data.board;
    this.tokenWallet = data.tokenWallet;
    this.WL = data.WL;
  }
}
