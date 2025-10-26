import { OperatorChipEntity } from '../entities/operator-chip.entity';

export abstract class OperatorChipRepository {
  abstract create(data: OperatorChipEntity): Promise<OperatorChipEntity>;
  abstract findAll(
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<OperatorChipEntity[] | []>;
  abstract findById(
    id: string,
    populateFields?: string | string[],
  ): Promise<OperatorChipEntity | null>;
  abstract findOneBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorChipEntity | null>;
  abstract findManyBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorChipEntity[] | []>;
  abstract update(
    id: string,
    data: Partial<OperatorChipEntity>,
  ): Promise<OperatorChipEntity | null>;
  abstract remove(id: string): Promise<OperatorChipEntity | null>;
  abstract deleteMany(filter: Record<string, any>): Promise<void>;
  abstract findByOperatorId(
    operatorId: string,
    page: number,
    limit: number,
    currencyId?: string,
  ): Promise<OperatorChipEntity[] | []>;
}
