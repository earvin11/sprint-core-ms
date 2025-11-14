import { Injectable } from '@nestjs/common';
import { WalletAuthPort } from '../domain/wallet-auth.port';
import { CurrencyUseCases } from 'src/currencies/application/currency.use-cases';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { getEntityFromRedisOrDb } from 'src/shared/helpers/get-entity-from-redis-or-db.helper';
import { RedisStorePort } from 'src/redis/domain/redis-store.port';
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
    this.loggerPort.log('playerWallet', playerWallet);
    if (!playerWallet) return { error: true, message: 'Player auth error' };

    const currency: any = await getEntityFromRedisOrDb(
      () => this.redisStorePort.get(`currency:${playerWallet.data.currency}`),
      () =>
        this.currencyUseCases.findOneBy({ short: playerWallet.data.currency }),
      (currencyDb) =>
        this.redisStorePort.set(
          `currency:${playerWallet.data.currency}`,
          JSON.stringify(currencyDb),
          1800,
        ),
    );

    if (!currency) return { error: true, message: 'Currency not found' };

    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    let player: any | null = null;

    player = await this.playerUseCases.findOneBy({
      operator: operatorId,
      username: playerWallet.data.username,
    });

    if (player) {
      // Dejar esto a queue no es inmediatamente necesario
      await this.playerUseCases.update(player._id!, {
        userId: String(playerWallet.data.userId),
        lastBalance: playerWallet.data.lastBalance,
        operator: operatorId,
        // operatorUuid: operator.uuid,
        tokenWallet: playerWallet.data.tokenWallet,
        WL: playerWallet.data.WL,
        currency: currency._id!,
      });
    } else if (!player) {
      player = await this.playerUseCases.create({
        userId: String(playerWallet.data.userId),
        username: playerWallet.data.username,
        lastBalance: playerWallet.data.lastBalance,
        operator: operatorId,
        tokenWallet: playerWallet.data.tokenWallet,
        WL: playerWallet.data.WL,
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
