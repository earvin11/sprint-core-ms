import { Injectable } from '@nestjs/common';
import { RouletteEntity } from '../domain/entities/roulette.entity';
import { Roulette } from '../domain/implementations/roulette.value';
import { RouletteRepository } from '../domain/repositories/roulette.repository';

@Injectable()
export class RouletteUseCases {
  constructor(private readonly rouletteRepository: RouletteRepository) {}

  public create = async (data: RouletteEntity) => {
    const newData = new Roulette(data);
    console.log({ newData });
    return await this.rouletteRepository.create(newData);
  };

  public findAll = async (page: number = 1, limit: number = 10) => {
    const data = await this.rouletteRepository.findAll(page, limit);
    return data;
  };

  public findById = async (id: string) => {
    const data = await this.rouletteRepository.findById(id);
    return data;
  };

  public findOneBy = async (filter: Record<string, any>) => {
    const data = await this.rouletteRepository.findOneBy(filter);
    return data;
  };

  public findManyBy = async (filter: Record<string, any>) => {
    const data = await this.rouletteRepository.findManyBy(filter);
    return data;
  };

  public update = async (id: string, data: Partial<RouletteEntity>) => {
    const dataUpdate = await this.rouletteRepository.update(id, data);
    return dataUpdate;
  };

  public updateMany = async (
    filter: Record<string, any>,
    data: Partial<RouletteEntity>,
  ) => {
    await this.rouletteRepository.updateMany(filter, data);
  };

  public remove = async (id: string) => {
    const data = await this.rouletteRepository.remove(id);
    return data;
  };

  // public allStreamsRoulettes = async (page = 1, limit = 100) => {
  //     const data = await this.rouletteRepository.findAll(page, limit);
  //     return data.map((roulette: RouletteEntity) => {
  //         return {
  //             name: roulette.name,
  //             urlTransmision: roulette.urlTransmision,
  //             _id: roulette._id,
  //         };
  //     });
  // };

  // public isRouletteOn = async (id: string) => {
  //     const data = await this.rouletteRepository.findById(id);
  //     if (!data) throw new NotFoundException("Roulette");
  //     if (!data.active) return { status: "OFF" };
  //     return { status: "ON" };
  // };
}
