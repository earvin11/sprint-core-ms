import { OperatorWheelEntity } from '../../entities/operator-game/operator-wheel.entity';

export abstract class OperatorWheelRepository {
  abstract create(data: OperatorWheelEntity): Promise<OperatorWheelEntity>;
  abstract findAll(
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<OperatorWheelEntity[] | []>;
  abstract findById(
    id: string,
    populateFields?: string | string[],
  ): Promise<OperatorWheelEntity | null>;
  abstract findOneBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorWheelEntity | null>;
  abstract findManyBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorWheelEntity[] | []>;
  abstract update(
    id: string,
    data: Partial<OperatorWheelEntity>,
  ): Promise<OperatorWheelEntity | null>;
  abstract remove(id: string): Promise<OperatorWheelEntity | null>;
}
