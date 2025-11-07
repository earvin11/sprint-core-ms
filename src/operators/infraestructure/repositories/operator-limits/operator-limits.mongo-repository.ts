import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OperatorLimitsRepository } from 'src/operators/domain/repositories/operator-limits/operator-limits.repository';
import { OperatorLimits } from '../../models/operator-limits/operator-limits.model';
import { OperatorLimitsEntity } from 'src/operators/domain/entities/operator-limits/operator-limits.entity';

export class OperatorLimitsMongoRepository implements OperatorLimitsRepository {
  constructor(
    @InjectModel(OperatorLimits.name)
    private readonly operatorLimitModel: Model<OperatorLimits>,
  ) {}
  async create(
    data: OperatorLimitsEntity,
  ): Promise<OperatorLimitsEntity | any> {
    const newData = await this.operatorLimitModel.create(data);
    const resp = await newData.save();
    return resp;
  }
  async findAll(
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<OperatorLimitsEntity[] | []> {
    let query = this.operatorLimitModel.find().skip(page).limit(limit);

    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  }
  async findById(
    id: string,
    populateFields?: string | string[],
  ): Promise<OperatorLimitsEntity | null> {
    let query = this.operatorLimitModel.findById(id);
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  }
  async findOneBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorLimitsEntity | null> {
    let query = this.operatorLimitModel.findOne(filter);

    // Si hay campos para popular
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  }
  async findManyBy(
    filter: Record<string, any>,
    page: number = 1,
    limit: number = 10,
    populateFields?: string | string[],
  ): Promise<OperatorLimitsEntity[] | []> {
    let query = this.operatorLimitModel.find(filter);
    if (populateFields) {
      query = query.populate(populateFields);
    }

    query.limit(limit).skip((page - 1) * limit);

    const data = await query.exec();
    return data;
  }
  async update(
    id: string,
    dataToUpdate: Partial<OperatorLimitsEntity>,
  ): Promise<OperatorLimitsEntity | null> {
    const data = await this.operatorLimitModel.findByIdAndUpdate(
      id,
      dataToUpdate,
      {
        new: true,
      },
    );
    return data;
  }
  async remove(id: string): Promise<OperatorLimitsEntity | null> {
    const data = await this.operatorLimitModel.findByIdAndUpdate(
      id,
      { status: false },
      { new: true },
    );
    return data;
  }
}
