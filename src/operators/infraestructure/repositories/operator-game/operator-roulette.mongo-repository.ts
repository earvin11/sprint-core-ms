import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GameTypes } from 'src/games/domain/entities/game.entity';
import { OperatorRouletteEntity } from 'src/operators/domain/entities/operator-game/operator-game-roulette.entity';
import { OperatorRouletteRepository } from 'src/operators/domain/repositories/operator-game/operator-roulette.repository';
import { OperatorRoulette } from '../../models/operator-game/operator-roulette.model';

@Injectable()
export class OperatorRouletteMongoRepository
  implements OperatorRouletteRepository
{
  constructor(
    @InjectModel(GameTypes.ROULETTE)
    private readonly operatorRouletteModel: Model<OperatorRoulette>,
  ) {}

  async create(
    data: OperatorRouletteEntity,
  ): Promise<OperatorRouletteEntity | any> {
    const newData = await this.operatorRouletteModel.create(data);
    const resp = await newData.save();
    return resp;
  }
  async findAll(
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<OperatorRouletteEntity[] | []> {
    let query = this.operatorRouletteModel.find().skip(page).limit(limit);

    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  }
  async findById(
    id: string,
    populateFields?: string | string[],
  ): Promise<OperatorRouletteEntity | null> {
    let query = this.operatorRouletteModel.findById(id);
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  }
  async findOneBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorRouletteEntity | null> {
    let query = this.operatorRouletteModel.findOne(filter);

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
  ): Promise<OperatorRouletteEntity[] | []> {
    let query = this.operatorRouletteModel.find(filter);
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  }
  async update(
    id: string,
    dataToUpdate: Partial<OperatorRouletteEntity>,
  ): Promise<OperatorRouletteEntity | null> {
    const data = await this.operatorRouletteModel.findByIdAndUpdate(
      id,
      dataToUpdate,
      {
        new: true,
      },
    );
    return data;
  }
  async remove(id: string): Promise<OperatorRouletteEntity | null> {
    const data = await this.operatorRouletteModel.findByIdAndUpdate(
      id,
      { status: false },
      { new: true },
    );
    return data;
  }
}
