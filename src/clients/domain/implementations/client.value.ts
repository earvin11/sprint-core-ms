import { randomUUID } from 'crypto';
import { ClientEntity } from '../entities/client.entity';

export class Client implements ClientEntity {
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

  constructor(data: ClientEntity) {
    this.name = data.name;
    this.uuid = data.uuid;
    this.logo = data.logo;
    this.loaderLogo = data.loaderLogo;
    this.endpointAuth = data.endpointAuth;
    this.endpointBet = data.endpointBet;
    this.endpointWin = data.endpointWin;
    this.endpointRollback = data.endpointRollback;
    this.useLogo = data.useLogo;
    this.urlGames = data.urlGames;
    this.status = true;
    this.available = true;
    this.token = randomUUID();
  }
}
