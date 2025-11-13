import { Module } from '@nestjs/common';
import { ClientModule } from 'src/clients/infraestructure/client.module';
import { OperatorModule } from 'src/operators/infraestructure/operator.module';
import { LaunchController } from './controllers/launch.controller';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';
import { RedisModule } from 'src/redis/infraestructure/redis.module';
import { LaunchUseCases } from '../application/launch.use-case';
import { LobbyUseCases } from '../application/lobby.use-case';
import { PlayerModule } from 'src/players/infraestructure/player.module';
import { CurrencyModule } from 'src/currencies/infraestructure/currency.module';
import { WalletAuthPort } from '../domain/wallet-auth.port';
import { WalletAuth } from './implementations/wallet-auth.implementation';
import { WalletAuthMock } from './implementations/mock/wallet-auth.mock';

@Module({
  imports: [
    ClientModule,
    OperatorModule,
    LoggerModule,
    PlayerModule,
    CurrencyModule,
    RedisModule,
  ],
  providers: [
    LaunchUseCases,
    LobbyUseCases,
    WalletAuthMock,
    WalletAuth,
    {
      provide: WalletAuthPort,
      // useExisting: WalletAuth,
      useExisting: WalletAuthMock,
    },
  ],
  controllers: [LaunchController],
})
export class LaunchModule {}
