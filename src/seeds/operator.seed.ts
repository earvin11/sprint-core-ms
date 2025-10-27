// src/seeds/operator.seed.ts
import { Model } from 'mongoose';
import { ClientEntity } from 'src/clients/domain/entities/client.entity';
import { OperatorEntity } from 'src/operators/domain/entities/operator.entity';

export async function seedOperators(
  operatorModel: Model<OperatorEntity>,
  clientModel: Model<ClientEntity>,
) {
  await operatorModel.deleteMany({});
  const client = await clientModel.findOne({ name: 'Cliente Demo' });

  const operators = [
    {
      name: 'Operador Demo',
      client: client?._id,
      endpointAuth: 'https://auth.operator.com',
      endpointBet: 'https://bet.operator.com',
      endpointWin: 'https://win.operator.com',
      endpointRollback: 'https://rollback.operator.com',
      casinoToken: 'token-secreto-123',
      available: true,
      buttonLobby: true,
      buttonSupport: false,
      urlGames: 'https://games.operator.com',
      background: 'https://example.com/bg.jpg',
      logo: 'https://example.com/logo.png',
      cruppierLogo: 'https://example.com/crupier-logo.png',
      primaryColor: '#1a237e',
      secondaryColor: '#6a1b9a',
      useLogo: true,
      loaderLogo: 'https://example.com/loader.gif',
    },
    {
      name: 'Operador Test',
      client: client?._id,
      endpointAuth: 'https://auth.testop.com',
      endpointBet: 'https://bet.testop.com',
      endpointWin: 'https://win.testop.com',
      endpointRollback: 'https://rollback.testop.com',
    },
  ];

  await operatorModel.insertMany(operators);
  console.log('Operadores creados');
}
