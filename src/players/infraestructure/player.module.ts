import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from './models/player.model';
import { PlayerMongoRepository } from './repositories/player.mongo-repository';
import { PlayerUseCases } from '../application/player.use-cases';
import { PlayerRepository } from '../domain/repositories/player.repository';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';
import { RedisModule } from 'src/redis/infraestructure/redis.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Player.name,
        schema: PlayerSchema,
      },
    ]),
    LoggerModule,
    RedisModule,
  ],
  providers: [
    PlayerMongoRepository,
    PlayerUseCases,
    {
      provide: PlayerRepository,
      useExisting: PlayerMongoRepository,
    },
  ],
  exports: [PlayerUseCases],
})
export class PlayerModule {}
