import { Model } from 'mongoose';
import { ClientEntity } from 'src/clients/domain/entities/client.entity';

export async function seedClients(clientModel: Model<ClientEntity>) {
  await clientModel.deleteMany({});

  const clients = [
    {
      name: 'Cliente Demo',
      endpointAuth: 'https://auth.demo.com',
      endpointBet: 'https://bet.demo.com',
      endpointWin: 'https://win.demo.com',
      endpointRollback: 'https://rollback.demo.com',
      logo: 'logo.png',
      loaderLogo: 'loader.png',
      urlGames: 'https://games.demo.com',
      useLogo: true,
    },
  ];

  await clientModel.insertMany(clients);
  console.log('Clientes creados');
}
