import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './models/game.model';
import { GameTypes } from '../domain/entities/game.entity';
import { RouletteSchema } from './models/roulette.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Game.name,
        schema: GameSchema,
        discriminators: [{ name: GameTypes.ROULETTE, schema: RouletteSchema }],
      },
    ]),
  ],
})
export class GameModule {}
