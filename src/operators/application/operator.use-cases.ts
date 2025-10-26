import { Injectable } from '@nestjs/common';
import { ClientRepository } from 'src/clients/domain/repositories/client.repository';
import { OperatorEntity } from '../domain/entities/operator.entity';
import { Operator } from '../domain/implementations/operator.value';
import { OperatorRepository } from '../domain/repositories/operator.repository';

@Injectable()
export class OperatorUseCases {
  constructor(
    private readonly operatorRepository: OperatorRepository,
    private readonly clientRepository: ClientRepository,
  ) {}

  public create = async (data: Partial<OperatorEntity>) => {
    const { endpointAuth, endpointBet, endpointWin, endpointRollback } = data;
    let newData: Operator;
    if (!endpointAuth || !endpointBet || !endpointWin || !endpointRollback) {
      const client = await this.clientRepository.findById(data.client!);
      if (!client) return;
      newData = new Operator({
        client: data.client!,
        cruppierLogo: data.cruppierLogo ?? '',
        name: data.name!,
        primaryColor: data.primaryColor ?? '',
        secondaryColor: data.secondaryColor ?? '',
        urlGames: data.urlGames,
        useLogo: data.useLogo,
        loaderLogo: data.loaderLogo,
        endpointAuth: client.endpointAuth,
        endpointBet: client.endpointBet,
        endpointWin: client.endpointWin,
        endpointRollback: client.endpointRollback,
      });
    } else {
      newData = new Operator({
        client: data.client!,
        cruppierLogo: data.cruppierLogo ?? '',
        name: data.name!,
        primaryColor: data.primaryColor ?? '',
        secondaryColor: data.secondaryColor ?? '',
        urlGames: data.urlGames,
        useLogo: data.useLogo,
        loaderLogo: data.loaderLogo,
        endpointAuth: data.endpointAuth!,
        endpointBet: data.endpointBet!,
        endpointWin: data.endpointWin!,
        endpointRollback: data.endpointRollback!,
      });
    }
    return await this.operatorRepository.create(newData);
  };

  public findAll = async (
    page: number = 1,
    limit: number = 10,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorRepository.findAll(
      page,
      limit,
      populateFields,
    );
    return data;
  };

  public findById = async (id: string, populateFields?: string | string[]) => {
    const data = await this.operatorRepository.findById(id, populateFields);
    return data;
  };

  public findOneBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorRepository.findOneBy(
      filter,
      populateFields,
    );
    return data;
  };

  public findManyBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorRepository.findManyBy(
      filter,
      populateFields,
    );
    return data;
  };

  public update = async (id: string, dataToUpdate: Partial<OperatorEntity>) => {
    const data = await this.operatorRepository.update(id, dataToUpdate);
    return data;
  };

  public remove = async (id: string) => {
    const data = await this.operatorRepository.remove(id);
    return data;
  };

  public updateUrls = async (id: string, urls: Record<string, string>) => {
    const { endpointAuth, endpointWin, endpointBet, endpointRollback } = urls;

    if (!endpointAuth && !endpointBet && !endpointWin && !endpointRollback)
      return;

    // Filtrar solo los valores que no son null o undefined
    const filteredEndpoints = Object.fromEntries(
      Object.entries({
        endpointAuth,
        endpointWin,
        endpointBet,
        endpointRollback,
      }).filter(([__, value]) => value !== null && value !== undefined),
    );

    // Llamar al método update con los endpoints filtrados
    const resp = await this.operatorRepository.update(id, filteredEndpoints);
    return resp;
  };

  public hardRemove = async (id: string) => {
    const data = await this.operatorRepository.hardRemove(id);
    return data;
  };
}
