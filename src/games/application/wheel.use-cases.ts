import { Injectable } from '@nestjs/common';
import { WheelRepository } from '../domain/repositories/wheel-fortune.repository';
import { Wheel } from '../domain/implementations/wheel.value';
import { WheelEntity } from '../domain/entities/wheel.entity';

@Injectable()
export class WheelUseCases {
  constructor(private readonly wheelRepository: WheelRepository) {}

  public create = async (data: WheelEntity) => {
    const newData = new Wheel(data);
    return await this.wheelRepository.create(newData);
  };

  public findAll = async (page: number = 1, limit: number = 10) => {
    const data = await this.wheelRepository.findAll(page, limit);
    return data;
  };

  public findById = async (id: string) => {
    const data = await this.wheelRepository.findById(id);
    return data;
  };

  public findOneBy = async (filter: Record<string, any>) => {
    const data = await this.wheelRepository.findOneBy(filter);
    return data;
  };

  public findManyBy = async (filter: Record<string, any>) => {
    const data = await this.wheelRepository.findManyBy(filter);
    return data;
  };

  public update = async (id: string, data: Partial<WheelEntity>) => {
    const dataUpdate = await this.wheelRepository.update(id, data);
    return dataUpdate;
  };

  public updateMany = async (
    filter: Record<string, any>,
    data: Partial<WheelEntity>,
  ) => {
    await this.wheelRepository.updateMany(filter, data);
  };

  public remove = async (id: string) => {
    const data = await this.wheelRepository.remove(id);
    return data;
  };
}
