import { CrupierEntity } from '../domain/crupier.entity';
import { CrupierRepository } from '../domain/crupier.repository';
import { Crupier } from '../domain/crupier.value';

export class CrupierUseCases {
  constructor(private readonly crupierRepository: CrupierRepository) {}

  public create = async (data: CrupierEntity) => {
    const newData = new Crupier(data);
    return await this.crupierRepository.create(newData);
  };

  public findAll = async (
    page: number = 1,
    limit: number = 10,
    populateFields?: string | string[],
  ) => {
    const data = await this.crupierRepository.findAll(
      page,
      limit,
      populateFields,
    );
    return data;
  };

  public findById = async (id: string, populateFields?: string | string[]) => {
    const data = await this.crupierRepository.findById(id, populateFields);
    return data;
  };

  public findOneBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ) => {
    const data = await this.crupierRepository.findOneBy(filter, populateFields);
    return data;
  };

  public findManyBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ) => {
    const data = await this.crupierRepository.findManyBy(
      filter,
      populateFields,
    );
    return data;
  };

  public update = async (id: string, dataToUpdate: Partial<CrupierEntity>) => {
    const data = await this.crupierRepository.update(id, dataToUpdate);
    return data;
  };

  public remove = async (id: string) => {
    const data = await this.crupierRepository.remove(id);
    return data;
  };
}
