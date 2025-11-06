import { InjectModel } from '@nestjs/mongoose';
import { OperatorLimitsTypesEnum } from 'src/operators/domain/entities/operator-limits/operator-limits.entity';
import { Model } from 'mongoose';
import { OperatorLimitsWheelRepository } from 'src/operators/domain/repositories/operator-limits/operator-limits-wheel.repository';
import { OperatorLimitsWheel } from '../../models/operator-limits/operator-limits-wheel.model';
import { OperatorLimitsWheelEntity } from 'src/operators/domain/entities/operator-limits/operator-limits-wheel.entity';

export class OperatorLimitsWheelMongoRepository
  implements OperatorLimitsWheelRepository
{
  constructor(
    @InjectModel(OperatorLimitsTypesEnum.WHEEL)
    private readonly operatorLimitWheel: Model<OperatorLimitsWheel>,
  ) {}
  async create(
    data: OperatorLimitsWheelEntity,
  ): Promise<OperatorLimitsWheelEntity | any> {
    const newData = await this.operatorLimitWheel.create(data);
    const resp = await newData.save();
    return resp;
  }
  async findAll(
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<OperatorLimitsWheelEntity[] | []> {
    let query = this.operatorLimitWheel.find().skip(page).limit(limit);

    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  }
  async findById(
    id: string,
    populateFields?: string | string[],
  ): Promise<OperatorLimitsWheelEntity | null> {
    let query = this.operatorLimitWheel.findById(id);
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  }
  async findOneBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<OperatorLimitsWheelEntity | null> {
    let query = this.operatorLimitWheel.findOne(filter);

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
  ): Promise<OperatorLimitsWheelEntity[] | []> {
    let query = this.operatorLimitWheel.find(filter);
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  }
  async update(
    id: string,
    dataToUpdate: Partial<OperatorLimitsWheelEntity>,
  ): Promise<OperatorLimitsWheelEntity | null> {
    const data = await this.operatorLimitWheel.findByIdAndUpdate(
      id,
      dataToUpdate,
      {
        new: true,
      },
    );
    return data;
  }
  async remove(id: string): Promise<OperatorLimitsWheelEntity | null> {
    const data = await this.operatorLimitWheel.findByIdAndUpdate(
      id,
      { status: false },
      { new: true },
    );
    return data;
  }
}
