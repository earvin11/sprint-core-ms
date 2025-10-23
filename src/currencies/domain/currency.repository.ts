import { CurrencyEntity } from './currency.entity';

export abstract class CurrencyRepository {
  abstract create(data: CurrencyEntity): Promise<CurrencyEntity>;
  abstract findAll(
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<CurrencyEntity[] | []>;
  abstract findById(
    id: string,
    populateFields?: string | string[],
  ): Promise<CurrencyEntity | null>;
  abstract findOneBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<CurrencyEntity | null>;
  abstract findManyBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<CurrencyEntity[] | []>;
  abstract update(
    id: string,
    data: Partial<CurrencyEntity>,
  ): Promise<CurrencyEntity | null>;
  abstract remove(id: string): Promise<CurrencyEntity | null>;
  abstract findManyByManyIds(ids: string[]): Promise<CurrencyEntity[] | []>;
  abstract findCountCurrencies(): Promise<number>;
}
