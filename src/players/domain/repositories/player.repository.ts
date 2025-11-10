import { PlayerEntity } from '../entities/player.entity';

export abstract class PlayerRepository {
  abstract create(data: PlayerEntity): Promise<PlayerEntity>;
  abstract findAll(page: number, limit: number): Promise<PlayerEntity[] | []>;
  abstract findById(id: string): Promise<PlayerEntity | null>;
  abstract findOneBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<PlayerEntity | null>;
  abstract findManyBy(
    filter: Record<string, any>,
  ): Promise<PlayerEntity[] | []>;
  abstract update(
    id: string,
    data: Partial<PlayerEntity>,
  ): Promise<PlayerEntity | null>;
  abstract remove(id: string): Promise<PlayerEntity | null>;
}
