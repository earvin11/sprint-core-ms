// import { ClientRouletteEntity } from '../domain/entities/client-roulette.entity';
// import { ClientRoulette } from '../domain/implementations/client-roulette.value';
// import { ClientRouletteRepository } from '../domain/repositories/client-roulette.repository';
// import { ClientRepository } from '../domain/repositories/client.repository';

// export class ClientRouletteUseCases {
//   constructor(
//     private readonly clientRouletteRepository: ClientRouletteRepository,
//     private readonly clientRepository: ClientRepository,
//     private readonly rouletteRepository: RouletteRepository,
//   ) {}

//   public create = async (data: ClientRouletteEntity) => {
//     const client = await this.clientRepository.findById(data.client);
//     if (!client) throw new NotFoundException('Client');

//     const roulette = await this.rouletteRepository.findById(data.roulette);
//     if (!roulette) throw new NotFoundException('Roulette');

//     const newData = new ClientRoulette(data);
//     return await this.clientRouletteRepository.create(newData);
//   };

//   public findAll = async (
//     page: number = 1,
//     limit: number = 10,
//     populateFields?: string | string[],
//   ) => {
//     const data = await this.clientRouletteRepository.findAll(
//       page,
//       limit,
//       populateFields,
//     );
//     return data;
//   };

//   public findById = async (id: string, populateFields?: string | string[]) => {
//     const data = await this.clientRouletteRepository.findById(
//       id,
//       populateFields,
//     );
//     return data;
//   };

//   public findOneBy = async (
//     filter: Record<string, any>,
//     populateFields?: string | string[],
//   ) => {
//     const data = await this.clientRouletteRepository.findOneBy(
//       filter,
//       populateFields,
//     );
//     return data;
//   };

//   public findManyBy = async (
//     filter: Record<string, any>,
//     populateFields?: string | string[],
//   ) => {
//     const data = await this.clientRouletteRepository.findManyBy(
//       filter,
//       populateFields,
//     );
//     return data;
//   };

//   public update = async (
//     id: string,
//     dataToUpdate: Partial<ClientRouletteEntity>,
//   ) => {
//     const data = await this.clientRouletteRepository.update(id, dataToUpdate);
//     return data;
//   };

//   public remove = async (id: string) => {
//     const data = await this.clientRouletteRepository.remove(id);

//     return data;
//   };

//   public getRoulettes = async (id: string, from: string) => {
//     //busca el cliente al que se le impotaran las ruletas
//     const client = await this.clientRepository.findById(id);

//     if (!client) return { message: 'client not found', error: true };

//     // Ruletas del cliente al que se le importaran ruletas

//     const roulettesOfClient: any[] =
//       await this.clientRouletteRepository.findClientsRoulettes(id);

//     //busca el cliente que exporta las ruletas

//     const clientExported = await this.clientRepository.findById(from);

//     if (!clientExported)
//       return { message: 'client exported not found', error: true };

//     const clientToImport: any[] =
//       await this.clientRouletteRepository.findClientsRoulettes(
//         clientExported._id!,
//       );

//     //const roulettesToImport: any[] = [];
//     //recorro las ruletas a importar
//     //  clientToImport.forEach((roulette) => {
//     //     if (!roulettesOfClient.includes(roulette)) {
//     //       roulettesToImport.push(roulette);
//     //     }
//     //   });

//     const arrayOfClient = roulettesOfClient.map((e) =>
//       e.roulette._id.toString(),
//     );
//     const arrayToImport = clientToImport.map((e) => e.roulette._id);

//     const roulettesToImport = arrayToImport.filter((e) => {
//       return !arrayOfClient.includes(e.toString());
//     });

//     if (!roulettesToImport.length) {
//       return {
//         error: true,
//         message: 'There are no roulettes to import from this client',
//       };
//     }
//     //agrego las ruletas al cliente

//     for (let i = 0; i < roulettesToImport.length; i++) {
//       const roulette = roulettesToImport[i];

//       await this.create({
//         client: client._id!,
//         roulette: roulette,
//       });
//     }
//     return { message: 'Roulettes asigned', error: false };
//   };

//   // public addRoulette = async(data: OperatorRouletteEntity) => {
//   //     const [operator, roulette, existsOpRou] = await Promise.all([
//   //         this.operatorRepository.findById(data.operator),
//   //         this.rouletteRepository.findById(data.roulette),
//   //         this.operatorRouletteRepository
//   //             .findOneBy({
//   //                 operator: data.operator,
//   //                 roulette: data.roulette
//   //             })
//   //     ]);

//   //     if(!operator || !operator.status || !operator.available)
//   //         throw new NotFoundException('Operator', RespErrorsOperatorEnum.NOT_FOUND_OR_DISABLED);

//   //     if(!roulette || !roulette.status)
//   //         throw new NotFoundException('Roulette', 'Roulette not found or disabled');

//   //     if(existsOpRou)
//   //         throw new Exception('Operator already has this roulette', 400);

//   //     const payload = new OperatorRoulette(data);
//   //     return await this.operatorRouletteRepository.create(payload);
//   // };

//   // public getRouletteByClient = async(operatorId: string, rouletteId: string) => {
//   //     const [operator, roulette] = await Promise.all([
//   //         this.operatorRepository.findById(operatorId),
//   //         this.rouletteRepository.findById(rouletteId)
//   //     ]);

//   //     if(!operator || !operator.status || !operator.available)
//   //         throw new NotFoundException('Operator', RespErrorsOperatorEnum.NOT_FOUND_OR_DISABLED);
//   //     if(!roulette || !roulette)
//   //         throw new NotFoundException('Roulette', 'Roulette not found or disabled');

//   //     const resp = await this.operatorRouletteRepository.findOneBy({
//   //         operator: operatorId,
//   //         roulette: rouletteId
//   //     });

//   //     if(!resp) throw new NotFoundException('OperatorRoulette');
//   //     return resp;
//   // }
// }
