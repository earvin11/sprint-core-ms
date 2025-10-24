import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './models/client.model';
import { RedisModule } from 'src/redis/infraestructure/redis.module';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';
import { ClientMongoRepository } from './repositories/client.mongo-repository';
import { ClientRepository } from '../domain/repositories/client.repository';
import { ClientController } from './controllers/client.controller';
import { ClientUseCases } from '../application/client.use-cases';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Client.name,
        schema: ClientSchema,
      },
    ]),
    LoggerModule,
    RedisModule,
  ],
  providers: [
    ClientMongoRepository,
    ClientUseCases,
    {
      provide: ClientRepository,
      useExisting: ClientMongoRepository,
    },
  ],
  controllers: [ClientController],
})
export class ClientModule {}
