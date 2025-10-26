import { Injectable } from '@nestjs/common';
import { CurrencyEntity } from '../domain/currency.entity';
import { CurrencyRepository } from '../domain/currency.repository';
import { Currency } from '../domain/currency.value';

@Injectable()
export class CurrencyUseCases {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  public create = async (data: CurrencyEntity) => {
    const newData = new Currency(data);
    return await this.currencyRepository.create(newData);
  };

  public findAll = async (
    page: number = 1,
    limit: number = 10,
    populateFields?: string | string[],
  ) => {
    const data = await this.currencyRepository.findAll(
      page,
      limit,
      populateFields,
    );
    return data;
  };

  public findById = async (id: string, populateFields?: string | string[]) => {
    const data = await this.currencyRepository.findById(id, populateFields);
    return data;
  };

  public findOneBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ) => {
    const data = await this.currencyRepository.findOneBy(
      filter,
      populateFields,
    );
    return data;
  };

  public findManyBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ) => {
    const data = await this.currencyRepository.findManyBy(
      filter,
      populateFields,
    );
    return data;
  };

  public update = async (id: string, dataToUpdate: Partial<CurrencyEntity>) => {
    const data = await this.currencyRepository.update(id, dataToUpdate);
    return data;
  };

  public remove = async (id: string) => {
    const data = await this.currencyRepository.remove(id);
    return data;
  };

  public findManyByManyIds = async (ids: string[]) => {
    const data = await this.currencyRepository.findManyByManyIds(ids);
    return data;
  };
  public findCountCurrencies = async () => {
    return await this.currencyRepository.findCountCurrencies();
  };
}
