import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GameTypes } from 'src/games/domain/entities/game.entity';
import { OperatorWheelRepository } from 'src/operators/domain/repositories/operator-game/operator-wheel.repository';
import { OperatorWheel } from '../../models/operator-game/operator-wheel.model';
import { OperatorWheelEntity } from 'src/operators/domain/entities/operator-game/operator-wheel.entity';

@Injectable()
export class OperatorWheelMongoRepository implements OperatorWheelRepository {
  constructor(
    @InjectModel(GameTypes.ROULETTE)
    private readonly operatorWheelModel: Model<OperatorWheel>,
  ) {}

  async create(data: OperatorWheelEntity): Promise<OperatorWheelEntity | any> {
    const newData = await this.operatorWheelModel.create(data);
    const resp = await newData.save();
    return resp;
  }
  async findAll(
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<OperatorWheelEntity[] | []> {
    let query = this.operatorWheelModel.find().skip(page).limit(limit);

    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  }
  async findById(
    id: string,
    populateFields?: string | string[],
  ): Promise<OperatorWheelEntity | null> {
    let query = this.operatorWheelModel.findById(id);
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  }
  async findOneBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorWheelEntity | null> {
    let query = this.operatorWheelModel.findOne(filter);

    // Si hay campos para popular
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  }
  async findManyBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorWheelEntity[] | []> {
    let query = this.operatorWheelModel.find(filter);
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  }
  async update(
    id: string,
    dataToUpdate: Partial<OperatorWheelEntity>,
  ): Promise<OperatorWheelEntity | null> {
    const data = await this.operatorWheelModel.findByIdAndUpdate(
      id,
      dataToUpdate,
      {
        new: true,
      },
    );
    return data;
  }
  async remove(id: string): Promise<OperatorWheelEntity | null> {
    const data = await this.operatorWheelModel.findByIdAndUpdate(
      id,
      { status: false },
      { new: true },
    );
    return data;
  }
}
