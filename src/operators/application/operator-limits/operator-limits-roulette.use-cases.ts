import { Injectable } from '@nestjs/common';
import { OperatorLimitsRouletteEntity } from 'src/operators/domain/entities/operator-limits/operator-limits-roulette.entity';
import { OperatorLimitsRoulette } from 'src/operators/domain/implementations/operator-limits/operator-limits-roulette.value';
import { OperatorLimitsRouletteRepository } from 'src/operators/domain/repositories/operator-limits/operator-limits-roulette.repository';

@Injectable()
export class OperatorLimitsRouletteUseCases {
  constructor(
    private readonly operatorlimitsRouletteRepository: OperatorLimitsRouletteRepository,
  ) {}

  public create = async (data: OperatorLimitsRouletteEntity) => {
    const newOpLimitRoulette = new OperatorLimitsRoulette(data);
    return await this.operatorlimitsRouletteRepository.create(
      newOpLimitRoulette,
    );
  };

  public findAll = async (
    page: number = 1,
    limit: number = 10,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorlimitsRouletteRepository.findAll(
      page,
      limit,
      populateFields,
    );
    return data;
  };

  public findById = async (id: string, populateFields?: string | string[]) => {
    const data = await this.operatorlimitsRouletteRepository.findById(
      id,
      populateFields,
    );
    return data;
  };

  public findOneBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorlimitsRouletteRepository.findOneBy(
      filter,
      populateFields,
    );
    return data;
  };

  public findManyBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorlimitsRouletteRepository.findManyBy(
      filter,
      populateFields,
    );
    return data;
  };

  public update = async (
    id: string,
    dataToUpdate: Partial<OperatorLimitsRouletteEntity>,
  ) => {
    const data = await this.operatorlimitsRouletteRepository.update(
      id,
      dataToUpdate,
    );
    return data;
  };

  public remove = async (id: string) => {
    const data = await this.operatorlimitsRouletteRepository.remove(id);
    return data;
  };
}
