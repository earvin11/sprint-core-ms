import { Injectable } from '@nestjs/common';
import { ClientEntity } from '../domain/entities/client.entity';
import { Client } from '../domain/implementations/client.value';
import { ClientRepository } from '../domain/repositories/client.repository';

@Injectable()
export class ClientUseCases {
  constructor(private readonly clientRepository: ClientRepository) {}

  public create = async (data: ClientEntity) => {
    const newData = new Client(data);
    return await this.clientRepository.create(newData);
  };

  public findAll = async (page: number = 1, limit: number = 10) => {
    const data = await this.clientRepository.findAll(page, limit);
    return data;
  };

  public findById = async (id: string) => {
    const data = await this.clientRepository.findById(id);
    return data;
  };

  public findOneBy = async (filter: Record<string, any>) => {
    const data = await this.clientRepository.findOneBy(filter);
    return data;
  };

  public findManyBy = async (filter: Record<string, any>) => {
    const data = await this.clientRepository.findManyBy(filter);
    return data;
  };

  public update = async (id: string, dataToUpdate: Partial<ClientEntity>) => {
    const data = await this.clientRepository.update(id, dataToUpdate);
    return data;
  };

  public remove = async (id: string) => {
    const data = await this.clientRepository.remove(id);
    return data;
  };

  public block = async (id: string) => {
    const data = await this.clientRepository.update(id, { available: false });
    return data;
  };

  public disblock = async (id: string) => {
    const data = await this.clientRepository.update(id, { available: true });
    return data;
  };
}
