import { InjectModel } from '@nestjs/mongoose';
import { CurrencyEntity } from 'src/currencies/domain/currency.entity';
import { CurrencyRepository } from 'src/currencies/domain/currency.repository';
import { Currency } from '../models/currency.model';
import { Model } from 'mongoose';

export class CurrencyMongoRepository implements CurrencyRepository {
  constructor(
    @InjectModel(Currency.name) private readonly currencyModel: Model<Currency>,
  ) {}

  public create = async (data: CurrencyEntity): Promise<CurrencyEntity> => {
    const newData = await this.currencyModel.create(data);
    const resp = await newData.save();
    return resp;
  };
  public findAll = async (
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<CurrencyEntity[] | []> => {
    let query = this.currencyModel.find().skip(page).limit(limit);
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  };
  public findById = async (
    id: string,
    populateFields?: string | string[],
  ): Promise<CurrencyEntity | null> => {
    let query = this.currencyModel.findById(id);
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  };
  public findOneBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<CurrencyEntity | null> => {
    let query = this.currencyModel.findOne(filter);

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
  ): Promise<CurrencyEntity[] | []> => {
    let query = this.currencyModel.find(filter);
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  };
  public update = async (
    id: string,
    data: Partial<CurrencyEntity>,
  ): Promise<CurrencyEntity | null> => {
    const resp = await this.currencyModel.findByIdAndUpdate(id, data);
    return resp;
  };
  public remove = async (id: string): Promise<CurrencyEntity | null> => {
    const resp = await this.currencyModel.findByIdAndDelete(id);
    return resp;
  };
  public findManyByManyIds = async (
    ids: string[],
  ): Promise<CurrencyEntity[] | []> => {
    const resp = await this.currencyModel.find({
      _id: { $in: ids },
    });
    return resp;
  };
  public findCountCurrencies = async (): Promise<number> => {
    return await this.currencyModel.countDocuments();
  };
}
