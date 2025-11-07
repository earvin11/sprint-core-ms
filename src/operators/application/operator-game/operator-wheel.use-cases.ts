import { Injectable } from '@nestjs/common';
import { OperatorRouletteEntity } from 'src/operators/domain/entities/operator-game/operator-game-roulette.entity';
import { OperatorWheelEntity } from 'src/operators/domain/entities/operator-game/operator-wheel.entity';
import { OperatorWheel } from 'src/operators/domain/implementations/operator-game/operator-wheel.value';
import { OperatorWheelRepository } from 'src/operators/domain/repositories/operator-game/operator-wheel.repository';

@Injectable()
export class OperatorWheelUseCases {
  constructor(
    private readonly operatorWheelRepository: OperatorWheelRepository,
  ) {}

  public create = async (data: OperatorWheelEntity) => {
    const newOpWheel = new OperatorWheel(data);
    return await this.operatorWheelRepository.create(newOpWheel);
  };

  public findAll = async (
    page: number = 1,
    limit: number = 10,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorWheelRepository.findAll(
      page,
      limit,
      populateFields,
    );
    return data;
  };

  public findById = async (id: string, populateFields?: string | string[]) => {
    const data = await this.operatorWheelRepository.findById(
      id,
      populateFields,
    );
    return data;
  };

  public findOneBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorWheelRepository.findOneBy(
      filter,
      populateFields,
    );
    return data;
  };

  public findManyBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorWheelRepository.findManyBy(
      filter,
      populateFields,
    );
    return data;
  };

  public update = async (
    id: string,
    dataToUpdate: Partial<OperatorRouletteEntity>,
  ) => {
    const data = await this.operatorWheelRepository.update(id, dataToUpdate);
    return data;
  };

  public updateOne = async (
    filter: Record<string, any>,
    data: Partial<OperatorRouletteEntity>,
  ) => {
    return await this.operatorWheelRepository.updateOne(filter, data);
  };

  public remove = async (id: string) => {
    const data = await this.operatorWheelRepository.remove(id);
    return data;
  };
}
