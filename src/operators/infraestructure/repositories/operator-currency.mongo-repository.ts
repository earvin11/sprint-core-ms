import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OperatorCurrencyEntity } from 'src/operators/domain/entities/operator-currency.entity';
import { OperatorCurrencyRepository } from 'src/operators/domain/repositories/operator-currency.repository';
import { OperatorCurrency } from '../models/operator-currency.model';
import { Model } from 'mongoose';

@Injectable()
export class OperatorCurrencyMongoRepository
  implements OperatorCurrencyRepository
{
  constructor(
    @InjectModel(OperatorCurrency.name)
    private readonly operatorCurrencyModel: Model<OperatorCurrency>,
  ) {}
  public create = async (
    data: OperatorCurrencyEntity,
  ): Promise<OperatorCurrencyEntity> => {
    const newData = await this.operatorCurrencyModel.create(data);
    return await newData.save();
  };
  public findAll = async (
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<OperatorCurrencyEntity[] | []> => {
    let query = this.operatorCurrencyModel.find().skip(page).limit(limit);

    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  };
  public findById = async (
    id: string,
    populateFields?: string | string[],
  ): Promise<OperatorCurrencyEntity | null> => {
    let query = this.operatorCurrencyModel.findById(id);

    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  };
  public findOneBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorCurrencyEntity | null> => {
    let query = this.operatorCurrencyModel.findOne(filter);

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
  ): Promise<OperatorCurrencyEntity[] | []> => {
    let query = this.operatorCurrencyModel.find(filter);
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  };
  public update = async (
    id: string,
    data: Partial<OperatorCurrencyEntity>,
  ): Promise<OperatorCurrencyEntity | null> => {
    return await this.operatorCurrencyModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  };
  public remove = async (
    id: string,
  ): Promise<OperatorCurrencyEntity | null> => {
    return await this.operatorCurrencyModel.findByIdAndDelete(id);
  };
}
