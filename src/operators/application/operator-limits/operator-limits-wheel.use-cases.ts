import { Injectable } from '@nestjs/common';
import { OperatorRouletteEntity } from 'src/operators/domain/entities/operator-game/operator-game-roulette.entity';
import { OperatorLimitsWheelEntity } from 'src/operators/domain/entities/operator-limits/operator-limits-wheel.entity';
import { OperatorLimitsWheelRepository } from 'src/operators/domain/repositories/operator-limits/operator-limits-wheel.repository';
import { OperatorLimitsWheel } from 'src/operators/infraestructure/models/operator-limits/operator-limits-wheel.model';

@Injectable()
export class OperatorLimitsWheelUseCases {
  constructor(
    private readonly operatorLimitsWheelRepository: OperatorLimitsWheelRepository,
  ) {}

  public create = async (data: OperatorLimitsWheelEntity) => {
    const newOpLimitWheel = new OperatorLimitsWheel(data);
    return await this.operatorLimitsWheelRepository.create(newOpLimitWheel);
  };

  public findAll = async (
    page: number = 1,
    limit: number = 10,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorLimitsWheelRepository.findAll(
      page,
      limit,
      populateFields,
    );
    return data;
  };

  public findById = async (id: string, populateFields?: string | string[]) => {
    const data = await this.operatorLimitsWheelRepository.findById(
      id,
      populateFields,
    );
    return data;
  };

  public findOneBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorLimitsWheelRepository.findOneBy(
      filter,
      populateFields,
    );
    return data;
  };

  public findManyBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorLimitsWheelRepository.findManyBy(
      filter,
      populateFields,
    );
    return data;
  };

  public update = async (
    id: string,
    dataToUpdate: Partial<OperatorLimitsWheelEntity>,
  ) => {
    const data = await this.operatorLimitsWheelRepository.update(
      id,
      dataToUpdate,
    );
    return data;
  };

  public remove = async (id: string) => {
    const data = await this.operatorLimitsWheelRepository.remove(id);
    return data;
  };
}
