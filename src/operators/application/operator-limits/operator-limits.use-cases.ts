import { Injectable } from '@nestjs/common';
import { OperatorLimitsEntity } from 'src/operators/domain/entities/operator-limits/operator-limits.entity';
import { OperatorLimitsRepository } from 'src/operators/domain/repositories/operator-limits/operator-limits.repository';
import { OperatorLimitsRoulette } from 'src/operators/infraestructure/models/operator-limits/operator-limits-roulette.model';

@Injectable()
export class OperatorLimitsUseCases {
  constructor(
    private readonly operatorlimitsRepository: OperatorLimitsRepository,
  ) {}

  public create = async (data: OperatorLimitsEntity) => {
    const newOpLimitRoulette = new OperatorLimitsRoulette(data);
    return await this.operatorlimitsRepository.create(newOpLimitRoulette);
  };

  public findAll = async (
    page: number = 1,
    limit: number = 10,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorlimitsRepository.findAll(
      page,
      limit,
      populateFields,
    );
    return data;
  };

  public findById = async (id: string, populateFields?: string | string[]) => {
    const data = await this.operatorlimitsRepository.findById(
      id,
      populateFields,
    );
    return data;
  };

  public findOneBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorlimitsRepository.findOneBy(
      filter,
      populateFields,
    );
    return data;
  };

  public findManyBy = async (
    filter: Record<string, any>,
    page?: number,
    limit?: number,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorlimitsRepository.findManyBy(
      filter,
      page,
      limit,
      populateFields,
    );
    return data;
  };

  public update = async (
    id: string,
    dataToUpdate: Partial<OperatorLimitsEntity>,
  ) => {
    const data = await this.operatorlimitsRepository.update(id, dataToUpdate);
    return data;
  };

  public updateOne = async (
    filter: Record<string, any>,
    data: Partial<OperatorLimitsEntity>,
  ) => {
    return await this.operatorlimitsRepository.updateOne(filter, data);
  };

  public remove = async (id: string) => {
    const data = await this.operatorlimitsRepository.remove(id);
    return data;
  };
}
