import { InjectModel } from '@nestjs/mongoose';
import { PlayerEntity } from 'src/players/domain/entities/player.entity';
import { PlayerRepository } from 'src/players/domain/repositories/player.repository';
import { Player } from '../models/player.model';
import { Model } from 'mongoose';

export class PlayerMongoRepository implements PlayerRepository {
  constructor(
    @InjectModel(Player.name)
    private readonly playerModel: Model<Player>,
  ) {}

  async create(data: PlayerEntity): Promise<PlayerEntity | any> {
    const newData = await this.playerModel.create(data);
    const resp = await newData.save();
    return resp;
  }
  async findAll(page: number, limit: number): Promise<PlayerEntity[] | []> {
    const data = await this.playerModel.find().skip(page).limit(limit);
    return data;
  }
  async findById(id: string): Promise<PlayerEntity | null> {
    const data = await this.playerModel.findById(id);
    return data;
  }
  async findOneBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<PlayerEntity | null> {
    let query = this.playerModel.findOne(filter);

    // Si hay campos para popular
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  }
  async findManyBy(filter: Record<string, any>): Promise<PlayerEntity[] | []> {
    const data = await this.playerModel.find(filter);
    return data;
  }
  async update(
    id: string,
    dataToUpdate: Partial<PlayerEntity>,
  ): Promise<PlayerEntity | null> {
    const data = await this.playerModel.findByIdAndUpdate(id, dataToUpdate, {
      new: true,
    });
    return data;
  }
  async remove(id: string): Promise<PlayerEntity | null> {
    console.log({ id });
    throw new Error('Method not implemented.');
  }
}
