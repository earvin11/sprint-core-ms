import { Injectable } from '@nestjs/common';
import { GameRepository } from '../domain/repositories/game.repository';
import { GameEntity } from '../domain/entities/game.entity';

@Injectable()
export class GameUseCases {
  constructor(private readonly gameRepository: GameRepository) {}
  public findAll = async (page: number = 1, limit: number = 10) => {
    const data = await this.gameRepository.findAll(page, limit);
    return data;
  };

  public findById = async (id: string) => {
    const data = await this.gameRepository.findById(id);
    return data;
  };

  public findOneBy = async (filter: Record<string, any>) => {
    const data = await this.gameRepository.findOneBy(filter);
    return data;
  };

  public findManyBy = async (filter: Record<string, any>) => {
    const data = await this.gameRepository.findManyBy(filter);
    return data;
  };

  public update = async (id: string, data: Partial<GameEntity>) => {
    const dataUpdate = await this.gameRepository.update(id, data);
    return dataUpdate;
  };

  public updateMany = async (
    filter: Record<string, any>,
    data: Partial<GameEntity>,
  ) => {
    await this.gameRepository.updateMany(filter, data);
  };

  public remove = async (id: string) => {
    const data = await this.gameRepository.remove(id);
    return data;
  };
}
