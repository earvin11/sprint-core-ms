import {
  ClientRouletteEntity,
} from '../entities/client-roulette.entity';

export abstract class ClientRouletteRepository {
  abstract create(data: ClientRouletteEntity): Promise<ClientRouletteEntity>;
  abstract findAll(
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<ClientRouletteEntity[] | []>;
  abstract findById(
    id: string,
    populateFields?: string | string[],
  ): Promise<ClientRouletteEntity | null>;
  abstract findOneBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<ClientRouletteEntity | null>;
  abstract findManyBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<ClientRouletteEntity[] | []>;
  abstract update(
    id: string,
    data: Partial<ClientRouletteEntity>,
  ): Promise<ClientRouletteEntity | null>;
  abstract remove(id: string): Promise<ClientRouletteEntity | null>;
  // abstract findClientsRoulettes(
  //   id: string,
  // ): Promise<findClientsRoulettes[] | []>;
  // abstract findWithCrupier(operatorId: string, currencyId?: string): Promise<WithCrupierResp[] | []>;
}
