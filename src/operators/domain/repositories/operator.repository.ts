import { OperatorEntity } from '../entities/operator.entity';

export abstract class OperatorRepository {
  abstract create(data: OperatorEntity): Promise<OperatorEntity>;
  abstract findAll(
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<OperatorEntity[] | []>;
  abstract findById(
    id: string,
    populateFields?: string | string[],
  ): Promise<OperatorEntity | null>;
  abstract findOneBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorEntity | null>;
  abstract findManyBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorEntity[] | []>;
  abstract update(
    id: string,
    data: Partial<OperatorEntity>,
  ): Promise<OperatorEntity | null>;
  abstract remove(id: string): Promise<OperatorEntity | null>;

  abstract hardRemove(id: string): Promise<OperatorEntity | null>;
}
