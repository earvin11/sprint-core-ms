import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from '../models/game.model';
import { WheelRepository } from 'src/games/domain/repositories/wheel-fortune.repository';
import { WheelEntity } from 'src/games/domain/entities/wheel.entity';
import { WheelDocument } from '../models/wheel.model';

@Injectable()
export class WheelMongoRepository implements WheelRepository {
  constructor(
    @InjectModel(Game.name)
    private readonly wheelModel: Model<WheelDocument>,
  ) {}
  public create = async (data: WheelEntity): Promise<WheelEntity> => {
    const newData = await this.wheelModel.create(data);
    return await newData.save();
  };
  public findAll = async (
    page: number,
    limit: number,
    filter?: Record<string, any>,
  ): Promise<WheelEntity[] | []> => {
    const data = await this.wheelModel
      .find({ ...filter })
      .skip(page)
      .limit(limit);
    return data;
  };
  public findById = async (id: string): Promise<WheelEntity | null> => {
    const data = await this.wheelModel.findById(id);
    return data;
  };
  public findManyBy = async (
    filter: Record<string, any>,
  ): Promise<WheelEntity[] | []> => {
    const data = await this.wheelModel.find(filter);
    return data;
  };
  public findOneBy = async (
    filter: Record<string, any>,
  ): Promise<WheelEntity | null> => {
    const data = await this.wheelModel.findOne(filter);
    return data;
  };
  public update = async (
    id: string,
    data: Partial<WheelEntity>,
  ): Promise<WheelEntity | null> => {
    const dataUpdate = await this.wheelModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return dataUpdate;
  };
  public updateMany = async (
    filter: Record<string, any>,
    data: Partial<WheelEntity>,
  ) => {
    await this.wheelModel.updateMany(filter, data);
  };
  remove = (id: string): Promise<WheelEntity | null> => {
    console.log({ id });
    throw new Error('Method not implemented.');
  };
}
