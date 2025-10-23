// import { ClientCurrencyRepository } from '../domain/repositories/client-currency.repository';
// import { ClientRepository } from '../domain/repositories/client.repository';
// import { ClientCurrencyEntity } from '../domain/entities/client-currency.entity';
// import { ClientCurrency } from '../domain/implementations/client-currency.value';

// export class ClientCurrencyUseCases {
//   constructor(
//     private readonly clientCurrencyRepository: ClientCurrencyRepository,
//     private readonly clientRepository: ClientRepository,
//     private readonly currencyRepository: ClientCurrencyRepository,
//   ) {}

//   public create = async (data: ClientCurrencyEntity) => {
//     await this.getClient(data.client);
//     const currency = await this.currencyRepository.findById(data.currency);
//     // if (!currency) throw new NotFoundException('Currency');
//     const existData = await this.clientCurrencyRepository.findOneBy({
//       client: data.client,
//       currency: data.currency,
//     });

//     if (existData) return existData;

//     const newData = new ClientCurrency(data);
//     return await this.clientCurrencyRepository.create(newData);
//   };

//   public findAll = async (
//     page: number = 1,
//     limit: number = 10,
//     populateFields?: string | string[],
//   ) => {
//     const data = await this.clientCurrencyRepository.findAll(
//       page,
//       limit,
//       populateFields,
//     );
//     return data;
//   };

//   public findById = async (id: string, populateFields?: string | string[]) => {
//     const data = await this.clientCurrencyRepository.findById(
//       id,
//       populateFields,
//     );
//     return data;
//   };

//   public findOneBy = async (
//     filter: Record<string, any>,
//     populateFields?: string | string[],
//   ) => {
//     const data = await this.clientCurrencyRepository.findOneBy(
//       filter,
//       populateFields,
//     );
//     return data;
//   };

//   public findManyBy = async (
//     filter: Record<string, any>,
//     populateFields?: string | string[],
//   ) => {
//     const data = await this.clientCurrencyRepository.findManyBy(
//       filter,
//       populateFields,
//     );
//     return data;
//   };

//   public update = async (
//     id: string,
//     dataToUpdate: Partial<ClientCurrencyEntity>,
//   ) => {
//     const data = await this.clientCurrencyRepository.update(id, dataToUpdate);
//     return data;
//   };

//   public remove = async (id: string) => {
//     const data = await this.clientCurrencyRepository.remove(id);
//     return data;
//   };

//   public modifyCurrencies = async (id: string, currencies: string[]) => {
//     const client = await this.getClient(id);

//     const currenciesValidate =
//       await this.currencyRepository.findManyByManyIds(currencies);

//     if (!currencies || currenciesValidate.length !== currencies.length)
//       throw new Exception(
//         'Some currencies was not found, retry the request with the right data',
//         400,
//       );

//     for (let i = 0; i < currenciesValidate.length; i++) {
//       const currency = currenciesValidate[i];
//       await this.create({ client: client._id!, currency: currency._id! });
//     }
//   };

//   public getCurrencies = async (id: string) => {
//     /*obtiene el cliente */
//     const client = await this.getClient(id);

//     if (!client) return { error: true, message: 'Client not found' };

//     /*Busca las currencies de este operador*/
//     const findCurrenciesClient = await this.clientCurrencyRepository.findManyBy(
//       { client: id },
//     );

//     if (!findCurrenciesClient.length)
//       return { error: true, message: 'This client has not coins' };

//     const array = findCurrenciesClient.map((e) => e.currency);

//     /*busca las currencies*/
//     const currencies = await this.currencyRepository.findManyByManyIds(array);

//     if (!currencies.length)
//       return { error: true, message: 'Currencies not found' };

//     return {
//       error: false,
//       currencies,
//       client,
//       message: 'ok',
//     };
//   };

//   private getClient = async (id: string) => {
//     const client = await this.clientRepository.findById(id);
//     if (!client) throw new NotFoundException('Client');
//     return client;
//   };
// }
