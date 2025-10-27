import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './models/game.model';
import { GameTypes } from '../domain/entities/game.entity';
import { RouletteSchema } from './models/roulette.model';
import { WheelSchema } from './models/wheel.model';
import { RouletteMongoRepository } from './repositories/roulette.mongo-repository';
import { RouletteUseCases } from '../application/roulette.use-cases';
import { RouletteRepository } from '../domain/repositories/roulette.repository';

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
  ],
  providers: [
    RouletteMongoRepository,
    RouletteUseCases,
    {
      provide: RouletteRepository,
      useExisting: RouletteMongoRepository,
    },
  ],
})
export class GameModule {}
