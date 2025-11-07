import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OperatorGame } from '../../models/operator-game/operator-game.model';
import { OperatorGameRepository } from 'src/operators/domain/repositories/operator-game/operator-game.repository';
import { OperatorGameEntity } from 'src/operators/domain/entities/operator-game/operator-game.entity';

@Injectable()
export class OperatorGameMongoRepository implements OperatorGameRepository {
  constructor(
    @InjectModel(OperatorGame.name)
    private readonly operatorGameModel: Model<OperatorGame>,
  ) {}

  async create(data: OperatorGameEntity): Promise<OperatorGameEntity | any> {
    const newData = await this.operatorGameModel.create(data);
    const resp = await newData.save();
    return resp;
  }
  async findAll(
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<OperatorGameEntity[] | []> {
    let query = this.operatorGameModel.find().skip(page).limit(limit);

    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  }
  async findById(
    id: string,
    populateFields?: string | string[],
  ): Promise<OperatorGameEntity | null> {
    let query = this.operatorGameModel.findById(id);
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  }
  async findOneBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorGameEntity | null> {
    let query = this.operatorGameModel.findOne(filter);

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
  ): Promise<OperatorGameEntity[] | []> {
    let query = this.operatorGameModel.find(filter);
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  }
  async update(
    id: string,
    dataToUpdate: Partial<OperatorGameEntity>,
  ): Promise<OperatorGameEntity | null> {
    const data = await this.operatorGameModel.findByIdAndUpdate(
      id,
      dataToUpdate,
      {
        new: true,
      },
    );
    return data;
  }
  async updateOne(
    filter: Record<string, any>,
    data: Partial<OperatorGameEntity>,
  ) {
    return await this.operatorGameModel.findOneAndUpdate(filter, data, {
      new: true,
    });
  }
  async remove(id: string): Promise<OperatorGameEntity | null> {
    const data = await this.operatorGameModel.findByIdAndUpdate(
      id,
      { status: false },
      { new: true },
    );
    return data;
  }
}
