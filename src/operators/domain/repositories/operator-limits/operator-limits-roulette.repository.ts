import { OperatorLimitsRouletteEntity } from '../../entities/operator-limits/operator-limits-roulette.entity';

export abstract class OperatorLimitsRouletteRepository {
  abstract create(
    data: OperatorLimitsRouletteEntity,
  ): Promise<OperatorLimitsRouletteEntity>;
  abstract findAll(
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<OperatorLimitsRouletteEntity[] | []>;
  abstract findById(
    id: string,
    populateFields?: string | string[],
  ): Promise<OperatorLimitsRouletteEntity | null>;
  abstract findOneBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorLimitsRouletteEntity | null>;
  abstract findManyBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorLimitsRouletteEntity[] | []>;
  abstract update(
    id: string,
    data: Partial<OperatorLimitsRouletteEntity>,
  ): Promise<OperatorLimitsRouletteEntity | null>;
  abstract updateOne(
    filter: Record<string, any>,
    data: Partial<OperatorLimitsRouletteEntity>,
  ): Promise<OperatorLimitsRouletteEntity | null>;
  abstract remove(id: string): Promise<OperatorLimitsRouletteEntity | null>;
}
