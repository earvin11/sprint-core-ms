import { Injectable } from '@nestjs/common';
import { PlayerEntity } from '../domain/entities/player.entity';
import { Player } from '../domain/implementations/player.value';
import { PlayerRepository } from '../domain/repositories/player.repository';

@Injectable()
export class PlayerUseCases {
  constructor(private readonly playerRepository: PlayerRepository) {}

  public create = async (data: PlayerEntity) => {
    const newData = new Player(data);
    return await this.playerRepository.create(newData);
  };

  public findAll = async (page: number = 1, limit: number = 10) => {
    const data = await this.playerRepository.findAll(page, limit);
    return data;
  };

  public findById = async (id: string) => {
    const data = await this.playerRepository.findById(id);
    return data;
  };

  public findOneBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ) => {
    const data = await this.playerRepository.findOneBy(filter, populateFields);
    return data;
  };

  public findManyBy = async (filter: Record<string, any>) => {
    const data = await this.playerRepository.findManyBy(filter);
    return data;
  };

  public update = async (id: string, dataToUpdate: Partial<PlayerEntity>) => {
    const data = await this.playerRepository.update(id, dataToUpdate);
    return data;
  };

  public remove = async (id: string) => {
    const data = await this.playerRepository.remove(id);
    return data;
  };
}
