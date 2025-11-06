import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from 'src/clients/infraestructure/client.module';
import { CurrencyModule } from 'src/currencies/infraestructure/currency.module';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';
import { RedisModule } from 'src/redis/infraestructure/redis.module';
import { Operator, OperatorSchema } from './models/operator.model';
import { OperatorMongoRepository } from './repositories/operator.mongo-repository';
import { OperatorRepository } from '../domain/repositories/operator.repository';
import { OperatorController } from './controllers/operator.controller';
import { OperatorUseCases } from '../application/operator.use-cases';
import { OperatorRouletteMongoRepository } from './repositories/operator-game/operator-roulette.mongo-repository';
import { OperatorWheelMongoRepository } from './repositories/operator-game/operator-wheel.mongo-repository';
import { OperatorRouletteRepository } from '../domain/repositories/operator-game/operator-roulette.repository';
import { OperatorWheelRepository } from '../domain/repositories/operator-game/operator-wheel.repository';
import {
  OperatorGame,
  OperatorGameSchema,
} from './models/operator-game/operator-game.model';
import { OperatorRouletteSchema } from './models/operator-game/operator-roulette.model';
import { OperatorWheelSchema } from './models/operator-game/operator-wheel.model';
import { OperatorWheelUseCases } from '../application/operator-game/operator-wheel.use-cases';
import { OperatorRouletteUseCases } from '../application/operator-game/operator-roulette.use-cases';
import { OperatorGameController } from './controllers/operator-game.controller';
import { OperatorGameTypesEnum } from '../domain/entities/operator-game/operator-game.entity';
import {
  OperatorLimits,
  OperatorLimitsSchema,
} from './models/operator-limits/operator-limits.model';
import { OperatorLimitsRouletteSchema } from './models/operator-limits/operator-limits-roulette.model';
import { OperatorLimitsWheelSchema } from './models/operator-limits/operator-limits-wheel.model';
import { OperatorLimitsTypesEnum } from '../domain/entities/operator-limits/operator-limits.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Operator.name,
        schema: OperatorSchema,
      },
      {
        name: OperatorGame.name,
        schema: OperatorGameSchema,
        discriminators: [
          {
            name: OperatorGameTypesEnum.OP_ROULETTE,
            schema: OperatorRouletteSchema,
          },
          { name: OperatorGameTypesEnum.OP_WHEEL, schema: OperatorWheelSchema },
        ],
      },
      {
        name: OperatorLimits.name,
        schema: OperatorLimitsSchema,
        discriminators: [
          {
            name: OperatorLimitsTypesEnum.ROULETTE,
            schema: OperatorLimitsRouletteSchema,
          },
          {
            name: OperatorLimitsTypesEnum.WHEEL,
            schema: OperatorLimitsWheelSchema,
          },
        ],
      },
    ]),
    ClientModule,
    CurrencyModule,
    LoggerModule,
    RedisModule,
  ],
  providers: [
    OperatorMongoRepository,
    OperatorRouletteMongoRepository,
    OperatorWheelMongoRepository,
    OperatorUseCases,
    OperatorRouletteUseCases,
    OperatorWheelUseCases,
    {
      provide: OperatorRepository,
      useExisting: OperatorMongoRepository,
    },
    {
      provide: OperatorRouletteRepository,
      useExisting: OperatorRouletteMongoRepository,
    },
    {
      provide: OperatorWheelRepository,
      useExisting: OperatorWheelMongoRepository,
    },
  ],
  controllers: [OperatorController, OperatorGameController],
})
export class OperatorModule {}
