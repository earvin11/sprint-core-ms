import { Injectable } from '@nestjs/common';
import { OperatorChipEntity } from '../domain/entities/operator-chip.entity';
import { OperatorChip } from '../domain/implementations/operator-chip.value';
import { OperatorChipRepository } from '../domain/repositories/operator-chip.repository';
import { OperatorRepository } from '../domain/repositories/operator.repository';
import { CurrencyRepository } from 'src/currencies/domain/currency.repository';
import { defualtChips } from 'src/shared/helpers/default-chips';

@Injectable()
export class OperatorChipUseCases {
  constructor(
    private readonly operatorChipRepository: OperatorChipRepository,
    private readonly operatorRepository: OperatorRepository,
    private readonly currencyRepository: CurrencyRepository,
  ) {}

  public create = async (data: OperatorChipEntity) => {
    const newData = new OperatorChip(data);
    return await this.operatorChipRepository.create(newData);
  };

  public findAll = async (
    page: number = 1,
    limit: number = 10,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorChipRepository.findAll(
      page,
      limit,
      populateFields,
    );
    return data;
  };

  public findById = async (id: string, populateFields?: string | string[]) => {
    const data = await this.operatorChipRepository.findById(id, populateFields);
    return data;
  };

  public findOneBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorChipRepository.findOneBy(
      filter,
      populateFields,
    );
    return data;
  };

  public findManyBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ) => {
    const data = await this.operatorChipRepository.findManyBy(
      filter,
      populateFields,
    );
    return data;
  };

  public update = async (
    id: string,
    dataToUpdate: Partial<OperatorChipEntity>,
  ) => {
    const data = await this.operatorChipRepository.update(id, dataToUpdate);
    return data;
  };

  public remove = async (id: string) => {
    const data = await this.operatorChipRepository.remove(id);
    return data;
  };

  public defaultChips = async (operatorId: string, currencyId: string) => {
    await this.getOperator(operatorId);
    const currency = await this.getCurrency(currencyId);

    await this.operatorChipRepository.deleteMany({
      operator: operatorId,
      currency: currencyId,
    });
    //TODO:
    if (!currency) return;

    let data: any;
    data = defualtChips[currency.short];
    if (!data) data = defualtChips['default'];

    const dataToSave = data.map((data: any) => {
      return {
        currency: currencyId,
        operator: operatorId,
        ...data,
      };
    });

    const insertPromises: any[] = [];

    dataToSave.forEach((element: any) => {
      insertPromises.push(this.operatorChipRepository.create(element));
    });

    await Promise.all(insertPromises);
    return;
  };

  public updateOrderChips = async (operatorId: string, chips: any) => {
    await this.getOperator(operatorId);

    const queries = chips.map(async ({ _id, order }) => {
      return this.operatorChipRepository.update(_id, { order });
    });

    await Promise.all(queries);
    return;
  };

  public findChipsByOperator = async (
    operatorId: string,
    page = 1,
    limit = 10,
    currencyId?: string,
  ) => {
    return await this.operatorChipRepository.findByOperatorId(
      operatorId,
      +page,
      +limit,
      currencyId,
    );
  };

  public getOperator = async (id: string) => {
    const operator = await this.operatorRepository.findById(id);
    // if(!operator) throw new NotFoundException('Operator');
    return operator;
  };

  public getCurrency = async (id: string) => {
    const currency = await this.currencyRepository.findById(id);
    // if(!currency) throw new NotFoundException('Currency');
    return currency;
  };
}
