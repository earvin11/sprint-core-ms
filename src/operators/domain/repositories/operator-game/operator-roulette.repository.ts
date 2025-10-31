import { OperatorRouletteEntity } from '../../entities/operator-game/operator-game-roulette.entity';

export abstract class OperatorRouletteRepository {
  abstract create(
    data: OperatorRouletteEntity,
  ): Promise<OperatorRouletteEntity>;
  abstract findAll(
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<OperatorRouletteEntity[] | []>;
  abstract findById(
    id: string,
    populateFields?: string | string[],
  ): Promise<OperatorRouletteEntity | null>;
  abstract findOneBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorRouletteEntity | null>;
  abstract findManyBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorRouletteEntity[] | []>;
  abstract update(
    id: string,
    data: Partial<OperatorRouletteEntity>,
  ): Promise<OperatorRouletteEntity | null>;
  abstract remove(id: string): Promise<OperatorRouletteEntity | null>;
}
