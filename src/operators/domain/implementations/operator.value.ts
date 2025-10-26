import { OperatorEntity } from '../entities/operator.entity';

export class Operator implements OperatorEntity {
  name: string;
  uuid?: string;
  client: string;
  status?: boolean;
  endpointAuth: string;
  endpointBet: string;
  endpointWin: string;
  endpointRollback: string;
  casinoToken?: string;
  available?: boolean;
  buttonLobby?: boolean;
  buttonSupport?: boolean;
  urlGames?: string;
  background?: string;
  logo?: string;
  cruppierLogo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  useLogo?: boolean;
  loaderLogo?: string;
  // tokenWallet: string;
  // operatorId: string;

  constructor(data: OperatorEntity) {
    this.name = data.name;
    this.uuid = data.uuid;
    this.client = data.client;
    this.status = true;
    this.endpointAuth = data.endpointAuth;
    this.endpointBet = data.endpointBet;
    this.endpointWin = data.endpointWin;
    this.endpointRollback = data.endpointRollback;
    this.casinoToken = data.casinoToken;
    this.available = true;
    this.buttonLobby = data.buttonLobby;
    this.buttonSupport = data.buttonSupport;
    this.urlGames = data.urlGames;
    this.background = data.background;
    this.logo = data.logo;
    this.cruppierLogo = data.cruppierLogo;
    this.primaryColor = data.primaryColor;
    this.secondaryColor = data.secondaryColor;
    this.useLogo = data.useLogo;
    this.loaderLogo = data.loaderLogo;
    // this.tokenWallet = data.tokenWallet;
    // this.operatorId = data.operatorId;
  }
}
