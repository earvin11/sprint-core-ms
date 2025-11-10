import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { OperatorChipEntity } from 'src/operators/domain/entities/operator-chip.entity';
import { OperatorChipRepository } from 'src/operators/domain/repositories/operator-chip.repository';
import { OperatorChip } from '../models/operator-chip.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OperatorChipMongoRepository implements OperatorChipRepository {
  constructor(
    @InjectModel(OperatorChip.name)
    private readonly operatorChipModel: Model<OperatorChip>,
  ) {}
  public create = async (
    data: OperatorChipEntity,
  ): Promise<OperatorChipEntity> => {
    const newData = new this.operatorChipModel(data);
    return await newData.save();
  };
  public findAll = async (
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<OperatorChipEntity[] | []> => {
    let query = this.operatorChipModel.find().skip(page).limit(limit);

    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  };
  public findById = async (
    id: string,
    populateFields?: string | string[],
  ): Promise<OperatorChipEntity | null> => {
    let query = this.operatorChipModel.findById(id);
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  };
  public findOneBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorChipEntity | null> => {
    let query = this.operatorChipModel.findOne(filter);

    // Si hay campos para popular
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  };
  public findManyBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorChipEntity[] | []> => {
    let query = this.operatorChipModel.find(filter);
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  };
  public update = async (
    id: string,
    data: Partial<OperatorChipEntity>,
  ): Promise<OperatorChipEntity | null> => {
    const resp = await this.operatorChipModel.findByIdAndUpdate(id, data);
    return resp;
  };
  public remove = async (id: string): Promise<OperatorChipEntity | null> => {
    const resp = await this.operatorChipModel.findByIdAndDelete(id);
    return resp;
  };
  public deleteMany = async (filter: Record<string, any>) => {
    await this.operatorChipModel.deleteMany(filter);
    return;
  };
  public findByOperatorId = async (
    operatorId: string,
    page: number,
    limit: number,
    currencyId?: string,
  ): Promise<OperatorChipEntity[] | []> => {
    const filter: Record<string, any> = {
      operator: operatorId,
    };

    // if(currencyId) filter.currency = mongoose.Types.ObjectId(currencyId);
    const data = await this.operatorChipModel.aggregate([
      {
        $lookup: {
          from: 'currencies',
          localField: 'currency',
          foreignField: '_id',
          as: 'operatorCurrency',
        },
      },
      { $match: filter },
      { $skip: (Number(page) - 1) * Number(limit) },
      { $limit: Number(limit) },
    ]);
    return data;
  };
}
