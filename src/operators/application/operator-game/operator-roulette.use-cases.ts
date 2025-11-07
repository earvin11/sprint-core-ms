import { Injectable } from '@nestjs/common';
import { OperatorRouletteEntity } from 'src/operators/domain/entities/operator-game/operator-game-roulette.entity';
import { OperatorRoulette } from 'src/operators/domain/implementations/operator-game/operator-game-roulette.value';
import { OperatorRouletteRepository } from 'src/operators/domain/repositories/operator-game/operator-roulette.repository';

@Injectable()
export class OperatorRouletteUseCases {
  constructor(
    private readonly operatorRouletteRepository: OperatorRouletteRepository,
  ) {}

  public create = async (data: OperatorRouletteEntity) => {
    const newOpRoulette = new OperatorRoulette(data);
    return await this.operatorRouletteRepository.create(newOpRoulette);
  };

  public findAll = async (
    page: number = 1,
    limit: number = 10,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorRouletteRepository.findAll(
      page,
      limit,
      populateFields,
    );
    return data;
  };

  public findById = async (id: string, populateFields?: string | string[]) => {
    const data = await this.operatorRouletteRepository.findById(
      id,
      populateFields,
    );
    return data;
  };

  public findOneBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorRouletteRepository.findOneBy(
      filter,
      populateFields,
    );
    return data;
  };

  public findManyBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorRouletteRepository.findManyBy(
      filter,
      populateFields,
    );
    return data;
  };

  public update = async (
    id: string,
    dataToUpdate: Partial<OperatorRouletteEntity>,
  ) => {
    const data = await this.operatorRouletteRepository.update(id, dataToUpdate);
    return data;
  };

  public updateOne = async (
    filter: Record<string, any>,
    data: Partial<OperatorRouletteEntity>,
  ) => {
    return await this.operatorRouletteRepository.updateOne(filter, data);
  };

  public remove = async (id: string) => {
    const data = await this.operatorRouletteRepository.remove(id);
    return data;
  };
}
