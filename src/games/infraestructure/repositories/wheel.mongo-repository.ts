import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from '../models/game.model';
import { WheelRepository } from 'src/games/domain/repositories/wheel-fortune.repository';
import { WheelEntity } from 'src/games/domain/entities/wheel.entity';
import { Wheel } from '../models/wheel.model';
import { GameTypes } from 'src/games/domain/entities/game.entity';

@Injectable()
export class WheelMongoRepository implements WheelRepository {
  constructor(
    @InjectModel(GameTypes.WHEEL) private readonly wheelModel: Model<Wheel>,
  ) {}
  public create = async (data: WheelEntity): Promise<any> => {
    const newData = await this.wheelModel.create(data);
    return await newData.save();
  };
  public findAll = async (
    page: number,
    limit: number,
    filter?: Record<string, any>,
  ): Promise<any[] | []> => {
    const data = await this.wheelModel
      .find({ ...filter })
      .skip(page)
      .limit(limit);
    return data;
  };
  public findById = async (id: string): Promise<any | null> => {
    const data = await this.wheelModel.findById(id);
    return data;
  };
  public findManyBy = async (
    filter: Record<string, any>,
  ): Promise<any[] | []> => {
    const data = await this.wheelModel.find(filter);
    return data;
  };
  public findOneBy = async (
    filter: Record<string, any>,
  ): Promise<any | null> => {
    const data = await this.wheelModel.findOne(filter);
    return data;
  };
  public update = async (
    id: string,
    data: Partial<any>,
  ): Promise<any | null> => {
    const dataUpdate = await this.wheelModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return dataUpdate;
  };
  public updateMany = async (
    filter: Record<string, any>,
    data: Partial<any>,
  ) => {
    await this.wheelModel.updateMany(filter, data);
  };
  public remove = async (id: string): Promise<any | null> => {
    console.log({ id });
    throw new Error('Method not implemented.');
  };
}
