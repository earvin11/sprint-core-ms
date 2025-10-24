import { InjectModel } from '@nestjs/mongoose';
import { CrupierEntity } from 'src/crupiers/domain/crupier.entity';
import { CrupierRepository } from 'src/crupiers/domain/crupier.repository';
import { Crupier } from '../models/crupier.model';
import { Model } from 'mongoose';

export class CrupierMongoRepository implements CrupierRepository {
  constructor(
    @InjectModel(Crupier.name) private readonly crupierModel: Model<Crupier>,
  ) {}
  public create = async (data: CrupierEntity): Promise<CrupierEntity> => {
    const newData = new this.crupierModel(data);
    return await newData.save();
  };
  public findAll = async (
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<CrupierEntity[] | []> => {
    let query = this.crupierModel.find().skip(page).limit(limit);

    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  };
  public findById = async (
    id: string,
    populateFields?: string | string[],
  ): Promise<CrupierEntity | null> => {
    let query = this.crupierModel.findById(id);
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  };
  public findOneBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<CrupierEntity | null> => {
    let query = this.crupierModel.findOne(filter);

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
  ): Promise<CrupierEntity[] | []> => {
    let query = this.crupierModel.find(filter);
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  };
  public update = async (
    id: string,
    data: Partial<CrupierEntity>,
  ): Promise<CrupierEntity | null> => {
    const resp = await this.crupierModel.findByIdAndUpdate(id, data);
    return resp;
  };
  public remove = async (id: string): Promise<CrupierEntity | null> => {
    const resp = await this.crupierModel.findByIdAndDelete(id);
    return resp;
  };
}
