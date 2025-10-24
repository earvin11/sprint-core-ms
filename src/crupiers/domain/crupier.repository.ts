import { CrupierEntity } from './crupier.entity';

export abstract class CrupierRepository {
  abstract create(data: CrupierEntity): Promise<CrupierEntity>;
  abstract findAll(
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<CrupierEntity[] | []>;
  abstract findById(
    id: string,
    populateFields?: string | string[],
  ): Promise<CrupierEntity | null>;
  abstract findOneBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<CrupierEntity | null>;
  abstract findManyBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<CrupierEntity[] | []>;
  abstract update(
    id: string,
    data: Partial<CrupierEntity>,
  ): Promise<CrupierEntity | null>;
  abstract remove(id: string): Promise<CrupierEntity | null>;
}
