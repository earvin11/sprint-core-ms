import { OperatorLimitsEntity } from '../../entities/operator-limits/operator-limits.entity';

export abstract class OperatorLimitsRepository {
  abstract create(data: OperatorLimitsEntity): Promise<OperatorLimitsEntity>;
  abstract findAll(
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<OperatorLimitsEntity[] | []>;
  abstract findById(
    id: string,
    populateFields?: string | string[],
  ): Promise<OperatorLimitsEntity | null>;
  abstract findOneBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorLimitsEntity | null>;
  abstract findManyBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorLimitsEntity[] | []>;
  abstract update(
    id: string,
    data: Partial<OperatorLimitsEntity>,
  ): Promise<OperatorLimitsEntity | null>;
  abstract remove(id: string): Promise<OperatorLimitsEntity | null>;
}
