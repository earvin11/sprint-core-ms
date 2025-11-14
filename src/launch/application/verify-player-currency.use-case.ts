import { Injectable } from '@nestjs/common';
import { OperatorEntity } from 'src/operators/domain/entities/operator.entity';
import { WalletAuthPort } from '../domain/wallet-auth.port';
import { CurrencyUseCases } from 'src/currencies/application/currency.use-cases';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { getEntityFromRedisOrDb } from 'src/shared/helpers/get-entity-from-redis-or-db.helper';
import { RedisStorePort } from 'src/redis/domain/redis-store.port';
import { PlayerEntity } from 'src/players/domain/entities/player.entity';
import { PlayerUseCases } from 'src/players/application/player.use-cases';

@Injectable()
export class VerifyPlayerAndCurrencyUseCase {
  constructor(
    private readonly currencyUseCases: CurrencyUseCases,
    private readonly loggerPort: LoggerPort,
    private readonly playerUseCases: PlayerUseCases,
    private readonly redisStorePort: RedisStorePort,
    private readonly walletAuthPort: WalletAuthPort,
  ) {}

  async run(token: string, operatorId: string, endpointAuth: string) {
    const playerWallet = await this.walletAuthPort.sendAuth(endpointAuth, {
      token,
    });
    if (!playerWallet) return { error: true, message: 'Player auth error' };

    const currency: any = await getEntityFromRedisOrDb(
      () => this.redisStorePort.get(`currency:${playerWallet.currency}`),
      () => this.currencyUseCases.findOneBy({ short: playerWallet.currency }),
      (currencyDb) =>
        this.redisStorePort.set(
          `currency:${playerWallet.currency}`,
          JSON.stringify(currencyDb),
          1800,
        ),
    );

    if (!currency) return { error: true, message: 'Currency not found' };

    let player: any | null = null;

    player = await this.playerUseCases.findOneBy({
      operator: operatorId,
      username: playerWallet.username,
    });

    if (player) {
      // Dejar esto a queue no es inmediatamente necesario
      await this.playerUseCases.update(player._id!, {
        userId: String(playerWallet.userId),
        lastBalance: playerWallet.lastBalance,
        operator: operatorId,
        // operatorUuid: operator.uuid,
        tokenWallet: playerWallet.tokenWallet,
        WL: playerWallet.WL,
        currency: currency._id!,
      });
    } else if (!player) {
      player = await this.playerUseCases.create({
        userId: String(playerWallet.userId),
        username: playerWallet.username,
        lastBalance: playerWallet.lastBalance,
        operator: operatorId,
        tokenWallet: playerWallet.tokenWallet,
        WL: playerWallet.WL,
        currency: currency._id!,
      });
    }

    if (!player.status)
      return { error: true, message: 'Player disabled or blocked' };

    return {
      error: false,
      player,
      currency,
    };
  }
}
