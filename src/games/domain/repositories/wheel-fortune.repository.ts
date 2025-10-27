import { WheelEntity } from '../entities/wheel.entity';

export abstract class WheelRepository {
  abstract create(data: WheelEntity): Promise<WheelEntity>;
  abstract findAll(
    page: number,
    limit: number,
    filter?: Record<string, any>,
  ): Promise<WheelEntity[] | []>;
  abstract findById(id: string): Promise<WheelEntity | null>;
  abstract findManyBy(filter: Record<string, any>): Promise<WheelEntity[] | []>;
  abstract findOneBy(filter: Record<string, any>): Promise<WheelEntity | null>;
  abstract update(
    id: string,
    data: Partial<WheelEntity>,
  ): Promise<WheelEntity | null>;
  abstract updateMany(
    filter: Record<string, any>,
    data: Partial<WheelEntity>,
  ): Promise<void>;
  abstract remove(id: string): Promise<WheelEntity | null>;
}
