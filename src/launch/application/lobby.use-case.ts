import { Injectable } from '@nestjs/common';
import { OperatorGameUseCases } from '../../operators/application/operator-game/operator-game.use-cases';
import { OperatorLimitsUseCases } from 'src/operators/application/operator-limits/operator-limits.use-cases';
import { OperatorChipUseCases } from 'src/operators/application/operator-chip.use-cases';
import { OperatorCurrencyUseCases } from 'src/operators/application/operator-currency.use-cases';
import { OperatorGameEntity } from 'src/operators/domain/entities/operator-game/operator-game.entity';
import { VerifyPlayerAndCurrencyUseCase } from './verify-player-currency.use-case';
import { VerifyOperatorUseCase } from './verify-operator.use-case';

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
    private readonly operatorChipUseCases: OperatorChipUseCases,
    private readonly operatorCurrencyUseCases: OperatorCurrencyUseCases,
    private readonly operatorGameUseCases: OperatorGameUseCases,
    private readonly operatorLimitsUseCases: OperatorLimitsUseCases,
    private readonly verifyPlayerCurrencyUseCase: VerifyPlayerAndCurrencyUseCase,
    private readonly verifyOperatorUseCase: VerifyOperatorUseCase,
  ) {}

  async run(input: LobbyRequestInterface) {
    const { operatorId, casinoToken, currency, token, language } = input;
    const respOperator = await this.verifyOperatorUseCase.run(
      operatorId,
      casinoToken,
    );
    if (respOperator.error || !respOperator.operator || !respOperator.client)
      return {
        message: respOperator.message,
        error: true,
      };
    const {
      error,
      currency: currencyData,
      player,
      message,
    } = await this.verifyPlayerCurrencyUseCase.run(
      token,
      operatorId,
      respOperator.operator.endpointAuth,
    );
    if (error || !currencyData || !player) return { error: true, message };
    const {
      background,
      logo,
      cruppierLogo,
      primaryColor,
      useLogo,
      secondaryColor,
      loaderLogo,
    } = respOperator.operator;

    const gamesInOperator = await this.operatorGameUseCases.findManyBy({
      operator: operatorId,
    });

    //TODO:
    const games = gamesInOperator.map((operatorGame: OperatorGameEntity) => {
      if (operatorGame.currencies.includes(currency)) {
        return operatorGame;
      }
    });

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
      NameOperator: respOperator.operator.name,
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
}
