import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './models/client.model';
import { RedisModule } from 'src/redis/infraestructure/redis.module';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';
import { ClientMongoRepository } from './repositories/client.mongo-repository';
import { ClientRepository } from '../domain/repositories/client.repository';

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
    {
      provide: ClientRepository,
      useExisting: ClientMongoRepository,
    },
  ],
})
export class ClientModule {}
