import { Injectable } from '@nestjs/common';
import { ClientUseCases } from 'src/clients/application/client.use-cases';
import { OperatorUseCases } from 'src/operators/application/operator.use-cases';
import { OperatorGameUseCases } from '../../operators/application/operator-game/operator-game.use-cases';
import { OperatorLimitsUseCases } from 'src/operators/application/operator-limits/operator-limits.use-cases';
import { OperatorChipUseCases } from 'src/operators/application/operator-chip.use-cases';
import { OperatorCurrencyUseCases } from 'src/operators/application/operator-currency.use-cases';
import { OperatorGameEntity } from 'src/operators/domain/entities/operator-game/operator-game.entity';
import { PlayerUseCases } from 'src/players/application/player.use-cases';
import { CurrencyUseCases } from 'src/currencies/application/currency.use-cases';
import { WalletAuthPort } from '../domain/wallet-auth.port';

export interface LobbyRequestInterface {
  token: string;
  operatorId: string;
  casinoToken: string;
  language: string;
  currency: string;
}
@Injectable()
export class LobbyUseCases {
  constructor(
    private readonly clientUseCases: ClientUseCases,
    private readonly operatorUseCases: OperatorUseCases,
    private readonly operatorChipUseCases: OperatorChipUseCases,
    private readonly operatorCurrencyUseCases: OperatorCurrencyUseCases,
    private readonly operatorGameUseCases: OperatorGameUseCases,
    private readonly operatorLimitsUseCases: OperatorLimitsUseCases,
    private readonly playerUseCases: PlayerUseCases,
    private readonly currencyUseCases: CurrencyUseCases,
    private readonly walletAuthPort: WalletAuthPort,
  ) {}

  async run(input: LobbyRequestInterface) {
    const { operatorId, casinoToken, currency, token, language } = input;
    console.log('input lobby use case', input);
    const operator: any = await this.operatorUseCases.findById(operatorId);
    if (!operator) return { error: true, message: 'Operator not found' };
    if (!operator.status || !operator.available)
      return { error: true, message: 'Operator block' };

    const client = await this.clientUseCases.findById(operator.client);
    if (!client) return { error: true, message: 'Client not found' };
    if (!client.status || !client.status)
      return { error: true, message: 'Client block or disabled' };
    if (client.token !== casinoToken)
      return { error: true, message: 'Casino token invalid' };

    const currencyData: any = await this.currencyUseCases.findOneBy({
      short: currency,
    });

    if (!currencyData) {
      return {
        ok: false,
        msg: 'Currency not found',
        status: 404,
      };
    }

    const playerWallet = await this.walletAuthPort.sendAuth(
      operator.endpointAuth,
      { token },
    );
    console.log('playerWalletx', playerWallet.data);
    // const playerWallet = {
    //   userId: 'asdasdassa',
    //   ok: true,
    //   msg: 'ok',
    //   username: 'player1',
    //   lastBalance: '1000',
    //   tokenWallet: 'zgp0wPDE33clbLPDL3Mgij8YDlaLRJt4yqNogxRpHZJG0W',
    //   WL: 'WLExample',
    // };

    // this.logger.info('playerWallet', { playerWallet, operatorId });
    // Si el endpoint no responde correctamente
    if (!playerWallet.data.ok)
      return {
        ok: playerWallet.data.ok,
        msg: playerWallet.data.msg
          ? playerWallet.data.msg
          : 'Error player in wallet',
        status: 400,
      };

    const gamesInOperator = await this.operatorGameUseCases.findManyBy({
      operator: operatorId,
    });
    console.log('gamesInOperator', gamesInOperator);

    //TODO:
    const games = gamesInOperator.map((operatorGame: OperatorGameEntity) => {
      if (operatorGame.currencies.includes(currency)) {
        return operatorGame;
      }
    });
    console.log('games', games);

    let player: any | null;

    player = await this.playerUseCases.findOneBy({
      operator: operatorId,
      userId: playerWallet.userId,
    });

    if (player) {
      // await updatePlayerQueue.add(QueueName.UPDATE_PLAYER, {
      //   player,
      //   operator,
      //   playerWallet,
      //   currency,
      // });
      await this.playerUseCases.update(player._id!, {
        userId: String(playerWallet.userId),
        lastBalance: playerWallet.lastBalance,
        operator: operator._id,
        // operatorUuid: operator.uuid,
        tokenWallet: playerWallet.tokenWallet,
        WL: playerWallet.WL,
        currency: currencyData._id!,
      });
    } else if (!player) {
      player = await this.playerUseCases.create({
        userId: String(playerWallet.userId),
        username: playerWallet.username,
        lastBalance: playerWallet.lastBalance,
        operator: operator._id!,
        tokenWallet: playerWallet.tokenWallet,
        WL: playerWallet.WL,
        currency: currencyData._id!,
      });

      // await this.playerRediUseCases.setPlayerSession(
      //   player,
      //   playerWallet.username,
      //   operator._id!,
      // );
    }

    if (!player.status)
      return {
        ok: false,
        msg: 'Player disabled, talk to administrator',
        status: 401,
      };

    const {
      background,
      logo,
      cruppierLogo,
      primaryColor,
      useLogo,
      secondaryColor,
      loaderLogo,
    } = operator;

    const queries = gamesInOperator.map(async (data: any) => {
      const limitsCurrencies = this.operatorLimitsUseCases.findOneBy({
        operator: data.operator,
        currency: currencyData._id,
        // roulette: data.roulette
      });
      return limitsCurrencies;
    });

    const limits = await Promise.all(queries);
    console.log('limits', limits);

    const casinosData = [...games];
    return {
      ok: true,
      status: 200,
      msg: 'Lobby OK',
      OperatorId: operatorId,
      NameOperator: operator.name,
      language,
      currency,
      // casinos: casinosData.sort((a, b) => a?.order - b?.order),
      casinos: casinosData,
      player,
      //TODO: revisar limits y no enviar
      limits,
      useLogo,
      logo: useLogo ? logo : '',
      loaderLogo: useLogo ? loaderLogo : '',
      background,
      cruppierLogo,
      primaryColor,
      secondaryColor,
    };
  }

  // private verifyOperatorAndClient = async (
  //   operatorId: string,
  //   casinoToken: string,
  // ) => {
  //   const operator = await getEntityFromRedisOrDb(
  //     () => this.operatorRedisUseCases.getById(operatorId),
  //     () => this.operatorUseCases.findById(operatorId),
  //     (operatorDb) => this.operatorRedisUseCases.setOperator(operatorDb),
  //   );

  //   if (!operator) throw new NotFoundException('Operator');
  //   if (!operator.status) throw new ResourceDisabledException('Operator');
  //   if (!operator.available) throw new ResourceBlockedException('Operator');

  //   const client = await getEntityFromRedisOrDb(
  //     () => this.clientRedisUseCases.getById(operator.client),
  //     () => this.clientUseCases.findById(operator.client),
  //     (clientDb) => this.clientRedisUseCases.setClient(clientDb),
  //   );

  //   if (!client) throw new NotFoundException('Client');
  //   if (!client.status) throw new ResourceDisabledException('Client');
  //   if (!client.available) throw new ResourceBlockedException('Client');
  //   if (client.token !== casinoToken)
  //     throw new Exception(CLIENT_ERRORS.CASINO_TOKEN_INVALID.msg, 401);

  //   return { operator, client };
  // };
}
