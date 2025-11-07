import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './models/game.model';
import { GameTypes } from '../domain/entities/game.entity';
import { RouletteSchema } from './models/roulette.model';
import { WheelSchema } from './models/wheel.model';
import { RouletteMongoRepository } from './repositories/roulette.mongo-repository';
import { RouletteUseCases } from '../application/roulette.use-cases';
import { RouletteRepository } from '../domain/repositories/roulette.repository';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';
import { RedisModule } from 'src/redis/infraestructure/redis.module';
import { WheelMongoRepository } from './repositories/wheel.mongo-repository';
import { WheelUseCases } from '../application/wheel.use-cases';
import { WheelRepository } from '../domain/repositories/wheel-fortune.repository';
import { GameMongoRepository } from './repositories/game.mongo-repository';
import { GameRepository } from '../domain/repositories/game.repository';
import { GameUseCases } from '../application/game.use-cases';
import { GameController } from './controllers/game.controller';

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
    GameMongoRepository,
    GameUseCases,
    RouletteMongoRepository,
    RouletteUseCases,
    WheelMongoRepository,
    WheelUseCases,
    {
      provide: GameRepository,
      useExisting: GameMongoRepository,
    },
    {
      provide: RouletteRepository,
      useExisting: RouletteMongoRepository,
    },
    {
      provide: WheelRepository,
      useExisting: WheelMongoRepository,
    },
  ],
  controllers: [GameController],
})
export class GameModule {}
