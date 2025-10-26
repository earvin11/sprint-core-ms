import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OperatorEntity } from 'src/operators/domain/entities/operator.entity';
import { OperatorRepository } from 'src/operators/domain/repositories/operator.repository';
import { Operator } from '../models/operator.model';

@Injectable()
export class OperatorMongoRepository implements OperatorRepository {
  constructor(
    @InjectModel(Operator.name) private readonly operatorModel: Model<Operator>,
  ) {}
  async create(data: OperatorEntity): Promise<OperatorEntity | any> {
    const newData = await this.operatorModel.create(data);
    const resp = await newData.save();
    return resp;
  }
  async findAll(
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<OperatorEntity[] | []> {
    let query = this.operatorModel.find().skip(page).limit(limit);

    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  }
  async findById(
    id: string,
    populateFields?: string | string[],
  ): Promise<OperatorEntity | null> {
    let query = this.operatorModel.findById(id);
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  }
  async findOneBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorEntity | null> {
    let query = this.operatorModel.findOne(filter);

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
  ): Promise<OperatorEntity[] | []> {
    let query = this.operatorModel.find(filter);
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  }
  async update(
    id: string,
    dataToUpdate: Partial<OperatorEntity>,
  ): Promise<OperatorEntity | null> {
    const data = await this.operatorModel.findByIdAndUpdate(id, dataToUpdate, {
      new: true,
    });
    return data;
  }
  async remove(id: string): Promise<OperatorEntity | null> {
    const data = await this.operatorModel.findByIdAndUpdate(
      id,
      { status: false },
      { new: true },
    );
    return data;
  }
  async hardRemove(id: string): Promise<OperatorEntity | null> {
    const data = await this.operatorModel.findByIdAndDelete(id);
    return data;
  }
}
