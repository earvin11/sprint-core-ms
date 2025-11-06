import { OperatorLimitsWheelEntity } from '../../entities/operator-limits/operator-limits-wheel.entity';

export abstract class OperatorLimitsWheelRepository {
  abstract create(
    data: OperatorLimitsWheelEntity,
  ): Promise<OperatorLimitsWheelEntity>;
  abstract findAll(
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<OperatorLimitsWheelEntity[] | []>;
  abstract findById(
    id: string,
    populateFields?: string | string[],
  ): Promise<OperatorLimitsWheelEntity | null>;
  abstract findOneBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorLimitsWheelEntity | null>;
  abstract findManyBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorLimitsWheelEntity[] | []>;
  abstract update(
    id: string,
    data: Partial<OperatorLimitsWheelEntity>,
  ): Promise<OperatorLimitsWheelEntity | null>;
  abstract remove(id: string): Promise<OperatorLimitsWheelEntity | null>;
}
