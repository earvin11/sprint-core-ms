import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ClientEntity } from 'src/clients/domain/entities/client.entity';
import { ClientRepository } from 'src/clients/domain/repositories/client.repository';
import { Client } from '../models/client.model';

@Injectable()
export class ClientMongoRepository implements ClientRepository {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<Client>,
  ) {}
  async create(data: ClientEntity): Promise<ClientEntity> {
    const newData = await this.clientModel.create(data);
    const resp = await newData.save();
    return resp;
  }
  async findAll(page: number, limit: number): Promise<ClientEntity[] | []> {
    const data = await this.clientModel.find(); //.skip(page).limit(limit);
    return data;
  }
  async findById(id: string): Promise<ClientEntity | null> {
    const data = await this.clientModel.findById(id);
    return data;
  }
  async findOneBy(filter: Record<string, any>): Promise<ClientEntity | null> {
    const data = await this.clientModel.findOne(filter);
    return data;
  }
  async findManyBy(filter: Record<string, any>): Promise<ClientEntity[] | []> {
    const data = await this.clientModel.find(filter);
    return data;
  }
  async update(
    id: string,
    dataToUpdate: Partial<ClientEntity>,
  ): Promise<ClientEntity | null> {
    const data = await this.clientModel.findByIdAndUpdate(id, dataToUpdate, {
      new: true,
    });
    return data;
  }
  async remove(id: string): Promise<ClientEntity | null> {
    const data = await this.clientModel.findByIdAndDelete(id);

    return data;
  }
}
