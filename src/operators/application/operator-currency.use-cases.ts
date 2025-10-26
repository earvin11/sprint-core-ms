import { Injectable } from '@nestjs/common';
import { CurrencyRepository } from 'src/currencies/domain/currency.repository';
import { OperatorCurrencyEntity } from '../domain/entities/operator-currency.entity';
import { OperatorCurrency } from '../domain/implementations/operator-currency.value';
import { OperatorCurrencyRepository } from '../domain/repositories/operator-currency.repository';

@Injectable()
export class OperatorCurrencyUseCases {
  constructor(
    private readonly operatorCurrencyRepository: OperatorCurrencyRepository,
    private readonly currencyRepository: CurrencyRepository,
  ) {}

  public create = async (data: OperatorCurrencyEntity) => {
    const newData = new OperatorCurrency(data);
    return await this.operatorCurrencyRepository.create(newData);
  };

  public findAll = async (
    page: number = 1,
    limit: number = 10,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorCurrencyRepository.findAll(
      page,
      limit,
      populateFields,
    );
    return data;
  };

  public findById = async (id: string, populateFields?: string | string[]) => {
    const data = await this.operatorCurrencyRepository.findById(
      id,
      populateFields,
    );
    return data;
  };

  public findOneBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorCurrencyRepository.findOneBy(
      filter,
      populateFields,
    );
    return data;
  };

  public findManyBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorCurrencyRepository.findManyBy(
      filter,
      populateFields,
    );
    return data;
  };

  public update = async (
    id: string,
    dataToUpdate: Partial<OperatorCurrencyEntity>,
  ) => {
    const data = await this.operatorCurrencyRepository.update(id, dataToUpdate);
    return data;
  };

  public remove = async (id: string) => {
    const data = await this.operatorCurrencyRepository.remove(id);
    return data;
  };

  public assignCurrenciesInOperator = async (
    currenciesIds: string[],
    operatorId: string,
  ) => {
    // Verificar las currencies de este operador
    const currenciesOfOperator = await this.findManyBy({
      operator: operatorId,
    });
    const currenciesInOperator = currenciesOfOperator.map(({ currency }) =>
      String(currency),
    );

    // Currencies a importar
    const currenciesInRequest = currenciesIds;

    const currenciesToAssign: string[] = [];

    currenciesInRequest.forEach((currencyToAssign: string) => {
      const currenciesOperator = currenciesInOperator;

      if (!currenciesOperator.includes(currencyToAssign)) {
        currenciesToAssign.push(currencyToAssign);
      }
    });

    const currenciesValidate =
      await this.currencyRepository.findManyByManyIds(currenciesToAssign);

    for (let i = 0; i < currenciesValidate.length; i++) {
      const currency = currenciesValidate[i];

      await this.create({
        operator: operatorId,
        currency: currency._id!,
      });
    }

    return;
  };

  public modifyCurrenciesInOperator = async (
    currenciesIds: string[],
    operatorId: string,
  ) => {
    const operatorCurrencies = await this.findManyBy({ operator: operatorId });

    for (let i = 0; i < operatorCurrencies.length; i++) {
      const operatorCurrency = operatorCurrencies[i];
      await this.remove(operatorCurrency._id!);
    }

    await this.assignCurrenciesInOperator(currenciesIds, operatorId);
    return;
  };
}
