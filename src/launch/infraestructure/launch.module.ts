import { Module } from '@nestjs/common';
import { ClientModule } from 'src/clients/infraestructure/client.module';
import { OperatorModule } from 'src/operators/infraestructure/operator.module';
import { LaunchController } from './controllers/launch.controller';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';
import { RedisModule } from 'src/redis/infraestructure/redis.module';
import { LaunchUseCases } from '../application/launch.use-case';
import { LobbyUseCases } from '../application/lobby.use-case';

@Module({
  imports: [ClientModule, OperatorModule, LoggerModule, RedisModule],
  providers: [LaunchUseCases, LobbyUseCases],
  controllers: [LaunchController],
})
export class LaunchModule {}
