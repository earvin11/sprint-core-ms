import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Crupier, CrupierSchema } from './models/crupier.model';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';
import { RedisModule } from 'src/redis/infraestructure/redis.module';
import { CrupierMongoRepository } from './repositories/crupier.mongo-repository';
import { CrupierRepository } from '../domain/crupier.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Crupier.name,
        schema: CrupierSchema,
      },
    ]),
    LoggerModule,
    RedisModule,
  ],
  providers: [
    CrupierMongoRepository,
    {
      provide: CrupierRepository,
      useExisting: CrupierMongoRepository,
    },
  ],
})
export class CrupierModule {}
