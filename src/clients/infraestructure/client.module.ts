import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './models/client.model';
import { RedisModule } from 'src/redis/infraestructure/redis.module';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';

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
})
export class ClientModule {}
