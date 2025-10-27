import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './models/game.model';
import { GameTypes } from '../domain/entities/game.entity';
import { Roulette, RouletteSchema } from './models/roulette.model';
import { Wheel, WheelSchema } from './models/wheel.model';
import { RouletteMongoRepository } from './repositories/roulette.mongo-repository';
import { RouletteUseCases } from '../application/roulette.use-cases';
import { RouletteRepository } from '../domain/repositories/roulette.repository';
import { RouletteController } from './controllers/roulette.controller';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';
import { RedisModule } from 'src/redis/infraestructure/redis.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Game.name,
        schema: GameSchema,
        discriminators: [
          {
            name: Roulette.name,
            schema: RouletteSchema,
            value: GameTypes.ROULETTE,
          },
          { name: Wheel.name, schema: WheelSchema, value: GameTypes.WHEEL },
        ],
      },
    ]),
    LoggerModule,
    RedisModule,
  ],
  providers: [
    RouletteMongoRepository,
    RouletteUseCases,
    {
      provide: RouletteRepository,
      useExisting: RouletteMongoRepository,
    },
  ],
  controllers: [RouletteController],
})
export class GameModule {}
