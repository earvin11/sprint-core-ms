import { ClientCurrencyEntity } from '../entities/client-currency.entity';

export abstract class ClientCurrencyRepository {
  abstract create(data: ClientCurrencyEntity): Promise<ClientCurrencyEntity>;
  abstract findAll(
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<ClientCurrencyEntity[] | []>;
  abstract findById(
    id: string,
    populateFields?: string | string[],
  ): Promise<ClientCurrencyEntity | null>;
  abstract findOneBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<ClientCurrencyEntity | null>;
  abstract findManyBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<ClientCurrencyEntity[] | []>;
  abstract update(
    id: string,
    data: Partial<ClientCurrencyEntity>,
  ): Promise<ClientCurrencyEntity | null>;
  abstract remove(id: string): Promise<ClientCurrencyEntity | null>;
  abstract removeManyBy(filter: Record<string, any>): Promise<void>;
}
