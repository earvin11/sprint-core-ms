import { ClientEntity } from '../entities/client.entity';

export abstract class ClientRepository {
  abstract create(data: ClientEntity): Promise<ClientEntity>;
  abstract findAll(page: number, limit: number): Promise<ClientEntity[] | []>;
  abstract findById(id: string): Promise<ClientEntity | null>;
  abstract findOneBy(filter: Record<string, any>): Promise<ClientEntity | null>;
  abstract findManyBy(
    filter: Record<string, any>,
  ): Promise<ClientEntity[] | []>;
  abstract update(
    id: string,
    data: Partial<ClientEntity>,
  ): Promise<ClientEntity | null>;
  abstract remove(id: string): Promise<ClientEntity | null>;
}
