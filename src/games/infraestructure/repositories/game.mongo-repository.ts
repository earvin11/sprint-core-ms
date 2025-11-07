import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from '../models/game.model';
import { GameRepository } from 'src/games/domain/repositories/game.repository';
import { GameEntity } from 'src/games/domain/entities/game.entity';

@Injectable()
export class GameMongoRepository implements GameRepository {
  constructor(
    @InjectModel(Game.name)
    private readonly gameModel: Model<Game>,
  ) {}
  public findAll = async (
    page: number,
    limit: number,
    filter?: Record<string, any>,
  ): Promise<GameEntity[] | []> => {
    const data = await this.gameModel
      .find({ ...filter })
      .skip(page)
      .limit(limit);
    return data;
  };
  public findById = async (id: string): Promise<GameEntity | null> => {
    const data = await this.gameModel.findById(id);
    return data;
  };
  public findManyBy = async (
    filter: Record<string, any>,
  ): Promise<GameEntity[] | []> => {
    const data = await this.gameModel.find(filter);
    return data;
  };
  public findOneBy = async (
    filter: Record<string, any>,
  ): Promise<GameEntity | null> => {
    const data = await this.gameModel.findOne(filter);
    return data;
  };
  public update = async (
    id: string,
    data: Partial<GameEntity>,
  ): Promise<GameEntity | null> => {
    const dataUpdate = await this.gameModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return dataUpdate;
  };
  public updateMany = async (
    filter: Record<string, any>,
    data: Partial<GameEntity>,
  ) => {
    await this.gameModel.updateMany(filter, data);
  };
  public remove = async (id: string): Promise<GameEntity | null> => {
    console.log({ id });
    throw new Error('Method not implemented.');
  };
}
