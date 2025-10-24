import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Currency, CurrencySchema } from './models/currency.model';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';
import { RedisModule } from 'src/redis/infraestructure/redis.module';
import { CurrencyMongoRepository } from './repositories/currency.mongo-repository';
import { CurrencyRepository } from '../domain/currency.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Currency.name,
        schema: CurrencySchema,
      },
    ]),
    LoggerModule,
    RedisModule,
  ],
  providers: [
    CurrencyMongoRepository,
    {
      provide: CurrencyRepository,
      useExisting: CurrencyMongoRepository,
    },
  ],
})
export class CurrencyModule {}
