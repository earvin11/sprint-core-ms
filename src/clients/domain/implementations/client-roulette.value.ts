import { ClientRouletteEntity } from '../entities/client-roulette.entity';

export class ClientRoulette implements ClientRouletteEntity {
  public client: string;
  public roulette: string;

  constructor(data: ClientRouletteEntity) {
    this.client = data.client;
    this.roulette = data.roulette;
  }
}
