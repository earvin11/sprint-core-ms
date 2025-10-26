import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RedisModule } from './redis/infraestructure/redis.module';
import { envs } from './config/envs';
import { BullModule } from '@nestjs/bullmq';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './clients/infraestructure/client.module';
import { CurrencyModule } from './currencies/infraestructure/currency.module';
import { CrupierModule } from './crupiers/infraestructure/crupier.module';
import { OperatorModule } from './operators/infraestructure/operator.module';

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
    CrupierModule,
    CurrencyModule,
    OperatorModule,
    RedisModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
