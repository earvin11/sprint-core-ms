import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { seedClients } from './client.seed';
import { envs } from 'src/config/envs';
import { seedCurrencies } from './currency.seed';
import { seedCrupiers } from './crupier.seed';
import { seedOperators } from './operator.seed';

async function seedAll() {
  if (envs.NODE_ENV === 'production') {
    console.error('Los seeders están deshabilitados en producción');
    process.exit(1);
  }
  const app = await NestFactory.createApplicationContext(AppModule);

  const clientModel = app.get('ClientModel');
  const currencyModel = app.get('CurrencyModel');
  const crupierModel = app.get('CrupierModel');
  const operatorModel = app.get('OperatorModel');

  await seedCurrencies(currencyModel);
  await seedClients(clientModel);
  await seedCrupiers(crupierModel);
  await seedOperators(operatorModel, clientModel);

  console.log('Todos los seeders han finalizado');

  await app.close();
  process.exit(1);
}

seedAll().catch((err) => {
  console.error('Error en seeding:', err);
  process.exit(1);
});
