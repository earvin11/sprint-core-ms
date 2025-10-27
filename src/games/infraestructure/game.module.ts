import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './models/game.model';
import { GameTypes } from '../domain/entities/game.entity';
import { RouletteSchema } from './models/roulette.model';
import { WheelSchema } from './models/wheel.model';
import { RouletteMongoRepository } from './repositories/roulette.mongo-repository';
import { RouletteUseCases } from '../application/roulette.use-cases';
import { RouletteRepository } from '../domain/repositories/roulette.repository';
import { RouletteController } from './controllers/roulette.controller';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';
import { RedisModule } from 'src/redis/infraestructure/redis.module';
import { WheelMongoRepository } from './repositories/wheel.mongo-repository';
import { WheelUseCases } from '../application/wheel.use-cases';
import { WheelRepository } from '../domain/repositories/wheel-fortune.repository';
import { WheelController } from './controllers/wheel.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Game.name,
        schema: GameSchema,
        discriminators: [
          { name: GameTypes.ROULETTE, schema: RouletteSchema },
          { name: GameTypes.WHEEL, schema: WheelSchema },
        ],
      },
    ]),
    LoggerModule,
    RedisModule,
  ],
  providers: [
    RouletteMongoRepository,
    RouletteUseCases,
    WheelMongoRepository,
    WheelUseCases,
    {
      provide: RouletteRepository,
      useExisting: RouletteMongoRepository,
    },
    {
      provide: WheelRepository,
      useExisting: WheelMongoRepository,
    },
  ],
  controllers: [RouletteController, WheelController],
})
export class GameModule {}
