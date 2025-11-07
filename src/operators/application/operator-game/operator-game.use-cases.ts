import { Injectable } from '@nestjs/common';
import { OperatorGameEntity } from 'src/operators/domain/entities/operator-game/operator-game.entity';
import { OperatorGame } from 'src/operators/domain/implementations/operator-game/operator-game.value';
import { OperatorGameRepository } from 'src/operators/domain/repositories/operator-game/operator-game.repository';

@Injectable()
export class OperatorGameUseCases {
  constructor(
    private readonly operatorGameRepository: OperatorGameRepository,
  ) {}

  public create = async (data: OperatorGameEntity) => {
    const newOpRoulette = new OperatorGame(data);
    return await this.operatorGameRepository.create(newOpRoulette);
  };

  public findAll = async (
    page: number = 1,
    limit: number = 10,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorGameRepository.findAll(
      page,
      limit,
      populateFields,
    );
    return data;
  };

  public findById = async (id: string, populateFields?: string | string[]) => {
    const data = await this.operatorGameRepository.findById(id, populateFields);
    return data;
  };

  public findOneBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorGameRepository.findOneBy(
      filter,
      populateFields,
    );
    return data;
  };

  public findManyBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorGameRepository.findManyBy(
      filter,
      populateFields,
    );
    return data;
  };

  public update = async (
    id: string,
    dataToUpdate: Partial<OperatorGameEntity>,
  ) => {
    const data = await this.operatorGameRepository.update(id, dataToUpdate);
    return data;
  };

  public updateOne = async (
    filter: Record<string, any>,
    data: Partial<OperatorGameEntity>,
  ) => {
    return await this.operatorGameRepository.updateOne(filter, data);
  };

  public remove = async (id: string) => {
    const data = await this.operatorGameRepository.remove(id);
    return data;
  };
}
