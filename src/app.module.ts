import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RedisModule } from './redis/infraestructure/redis.module';
import { envs } from './config/envs';
import { BullModule } from '@nestjs/bullmq';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './clients/infraestructure/client.module';

@Module({
  imports: [
    MongooseModule.forRoot(envs.dbUri, {
      dbName: envs.dbName,
    }),
    BullModule.forRoot({
      connection: {
        host: envs.redisHost,
        port: envs.redisPort,
        password: envs.redisPassword,
      },
    }),
    ClientModule,
    RedisModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
