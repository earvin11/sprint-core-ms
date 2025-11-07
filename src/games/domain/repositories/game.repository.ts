import { GameEntity } from '../entities/game.entity';

export abstract class GameRepository {
  abstract findAll(
    page: number,
    limit: number,
    filter?: Record<string, any>,
  ): Promise<GameEntity[] | []>;
  abstract findById(id: string): Promise<GameEntity | null>;
  abstract findManyBy(filter: Record<string, any>): Promise<GameEntity[] | []>;
  abstract findOneBy(filter: Record<string, any>): Promise<GameEntity | null>;
  abstract update(
    id: string,
    data: Partial<GameEntity>,
  ): Promise<GameEntity | null>;
  abstract updateMany(
    filter: Record<string, any>,
    data: Partial<GameEntity>,
  ): Promise<void>;
  abstract remove(id: string): Promise<GameEntity | null>;
}
