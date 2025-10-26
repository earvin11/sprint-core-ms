export interface OperatorEntity {
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
  // operatorId: string;
  // tokenWallet: string;
}
