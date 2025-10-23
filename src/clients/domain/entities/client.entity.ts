export interface ClientEntity {
  name: string;
  uuid?: string;
  logo: string;
  loaderLogo: string;
  token?: string;
  endpointAuth: string;
  endpointBet: string;
  endpointWin: string;
  endpointRollback: string;
  status?: boolean;
  available?: boolean;
  useLogo?: boolean;
  urlGames: string;
}
