import { OperatorGameEntity } from '../../entities/operator-game/operator-game.entity';

export abstract class OperatorGameRepository {
  abstract create(data: OperatorGameEntity): Promise<OperatorGameEntity>;
  abstract findAll(
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<OperatorGameEntity[] | []>;
  abstract findById(
    id: string,
    populateFields?: string | string[],
  ): Promise<OperatorGameEntity | null>;
  abstract findOneBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorGameEntity | null>;
  abstract findManyBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorGameEntity[] | []>;
  abstract update(
    id: string,
    data: Partial<OperatorGameEntity>,
  ): Promise<OperatorGameEntity | null>;
  abstract remove(id: string): Promise<OperatorGameEntity | null>;
}
