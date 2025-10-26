import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Crupier, CrupierSchema } from './models/crupier.model';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';
import { RedisModule } from 'src/redis/infraestructure/redis.module';
import { CrupierMongoRepository } from './repositories/crupier.mongo-repository';
import { CrupierRepository } from '../domain/crupier.repository';
import { CrupierUseCases } from '../application/crupier.use-cases';
import { CrupierController } from './controllers/crupier.controller';

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
    CrupierUseCases,
    {
      provide: CrupierRepository,
      useExisting: CrupierMongoRepository,
    },
  ],
  controllers: [CrupierController],
})
export class CrupierModule {}
