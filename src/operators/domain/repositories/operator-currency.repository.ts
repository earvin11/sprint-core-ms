import { OperatorCurrencyEntity } from '../entities/operator-currency.entity';

export abstract class OperatorCurrencyRepository {
  abstract create(
    data: OperatorCurrencyEntity,
  ): Promise<OperatorCurrencyEntity>;
  abstract findAll(
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<OperatorCurrencyEntity[] | []>;
  abstract findById(
    id: string,
    populateFields?: string | string[],
  ): Promise<OperatorCurrencyEntity | null>;
  abstract findOneBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorCurrencyEntity | null>;
  abstract findManyBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorCurrencyEntity[] | []>;
  abstract update(
    id: string,
    data: Partial<OperatorCurrencyEntity>,
  ): Promise<OperatorCurrencyEntity | null>;
  abstract remove(id: string): Promise<OperatorCurrencyEntity | null>;
}
