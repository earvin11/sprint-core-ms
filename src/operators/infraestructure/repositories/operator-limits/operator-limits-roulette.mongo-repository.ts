import { InjectModel } from '@nestjs/mongoose';
import { OperatorLimitsRouletteEntity } from 'src/operators/domain/entities/operator-limits/operator-limits-roulette.entity';
import { OperatorLimitsTypesEnum } from 'src/operators/domain/entities/operator-limits/operator-limits.entity';
import { OperatorLimitsRouletteRepository } from 'src/operators/domain/repositories/operator-limits/operator-limits-roulette.repository';
import { OperatorLimitsRoulette } from '../../models/operator-limits/operator-limits-roulette.model';
import { Model } from 'mongoose';

export class OperatorLimitsRouletteMongoRepository
  implements OperatorLimitsRouletteRepository
{
  constructor(
    @InjectModel(OperatorLimitsTypesEnum.ROULETTE)
    private readonly operatorLimitRoulette: Model<OperatorLimitsRoulette>,
  ) {}
  async create(
    data: OperatorLimitsRouletteEntity,
  ): Promise<OperatorLimitsRouletteEntity | any> {
    const newData = await this.operatorLimitRoulette.create(data);
    const resp = await newData.save();
    return resp;
  }
  async findAll(
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<OperatorLimitsRouletteEntity[] | []> {
    let query = this.operatorLimitRoulette.find().skip(page).limit(limit);

    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  }
  async findById(
    id: string,
    populateFields?: string | string[],
  ): Promise<OperatorLimitsRouletteEntity | null> {
    let query = this.operatorLimitRoulette.findById(id);
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  }
  async findOneBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorLimitsRouletteEntity | null> {
    let query = this.operatorLimitRoulette.findOne(filter);

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
  ): Promise<OperatorLimitsRouletteEntity[] | []> {
    let query = this.operatorLimitRoulette.find(filter);
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  }
  async update(
    id: string,
    dataToUpdate: Partial<OperatorLimitsRouletteEntity>,
  ): Promise<OperatorLimitsRouletteEntity | null> {
    const data = await this.operatorLimitRoulette.findByIdAndUpdate(
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
    data: Partial<OperatorLimitsRouletteEntity>,
  ): Promise<OperatorLimitsRouletteEntity | null> {
    const resp = await this.operatorLimitRoulette.findOneAndUpdate(
      filter,
      data,
      {
        new: true,
      },
    );
    return resp;
  }
  async remove(id: string): Promise<OperatorLimitsRouletteEntity | null> {
    const data = await this.operatorLimitRoulette.findByIdAndUpdate(
      id,
      { status: false },
      { new: true },
    );
    return data;
  }
}
