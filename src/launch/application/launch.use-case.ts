import { Injectable } from '@nestjs/common';
import { OperatorGameUseCases } from '../../operators/application/operator-game/operator-game.use-cases';
import { OperatorLimitsUseCases } from 'src/operators/application/operator-limits/operator-limits.use-cases';
import { OperatorChipUseCases } from 'src/operators/application/operator-chip.use-cases';
import { VerifyPlayerAndCurrencyUseCase } from './verify-player-currency.use-case';
import { VerifyOperatorUseCase } from './verify-operator.use-case';

export interface LaunchRequestInterface {
  token: string;
  operatorId: string;
  language: string;
  casinoToken: string;
  currency: string;
  casinoId: string;
}
@Injectable()
export class LaunchUseCases {
  constructor(
    private readonly operatorChipUseCases: OperatorChipUseCases,
    private readonly operatorGameUseCases: OperatorGameUseCases,
    private readonly operatorLimitsUseCases: OperatorLimitsUseCases,
    private readonly verifyPlayerCurrencyUseCase: VerifyPlayerAndCurrencyUseCase,
    private readonly verifyOperatorUseCase: VerifyOperatorUseCase,
  ) {}

  async run(input: LaunchRequestInterface) {
    const { operatorId, casinoToken, language, token, casinoId } = input;

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

    const game: any = await this.operatorGameUseCases.findOneBy({
      operator: operatorId,
      game: casinoId,
    });
    if (!game)
      return {
        ok: false,
        msg: 'Game not found for this operator',
        status: 404,
      };

    const limits: any = await this.operatorLimitsUseCases.findOneBy({
      operator: operatorId,
      game: casinoId,
      currency: currencyData._id!,
    });

    if (!limits)
      return {
        ok: false,
        msg: 'Limits not founds',
        status: 404,
      };

    const chips = await this.operatorChipUseCases.findManyBy({
      operator: operatorId,
      currency: currencyData._id!,
    });

    const latestResults = []; //todo

    const limitsTable = {
      pleno: {
        ...limits.pleno,
        pay: game.pleno,
      },
      semipleno: {
        ...limits.semipleno,
        pay: game.semipleno,
      },
      cuadro: {
        ...limits.cuadro,
        pay: game.cuadro,
      },
      calle: {
        ...limits.calle,
        pay: game.calle,
      },
      linea: {
        ...limits.linea,
        pay: game.linea,
      },
      columna: {
        ...limits.columna,
        pay: game.columna,
      },
      docena: {
        ...limits.docena,
        pay: game.docena,
      },
      chanceSimple: {
        ...limits.chanceSimple,
        pay: game.chanceSimple,
      },
      colorBet: {
        ...limits.color,
        pay: game.chanceSimple,
      },
      even_odd: {
        ...limits.even_odd,
        pay: game.chanceSimple,
      },
      cubre: {
        ...limits.cubre,
        pay: game.cubre,
      },
      specialCalle: {
        ...limits.specialCalle,
        pay: game.specialCalle || game.specialCalle,
      },
      minBet: limits.minBet ? limits.minBet : game.minBet,
      maxBet: limits.maxBet ? limits.maxBet : game.maxBet,
      maxBetPosition: limits.maxBetPosition
        ? limits.maxBetPosition
        : game.maxBetPosition,
    };

    const casinoData = {
      _id: game._id,
      doubleZero: game.doubleZero,
      name: game.name,
      color: game.color,
      imgBackground: game.imgBackground,
      language: game.language,
      code: game.code,
      roundDuration: game.roundDuration,
      lastJackpot: game.lastJackpot,
      providerId: game.providerId,
      urlTransmision: game.urlTransmision,
      maxPlenosBet: game.maxPlenosBet,
      animals: game.animals,
      layout: game.layout,
      template: game.template,
      openingTime: game.openingTime ?? '11:00',
      closingTime: game.closingTime ?? '12:00',
      active: game.active,
      manualDisable: game.manualDisable,
      ...limitsTable,
    };

    return {
      ok: true,
      status: 200,
      msg: 'Player success',
      language,
      player,
      casinoData,
      minBet: limits.minBet,
      maxBet: limits.maxBet,
      latestResults,
      // liveVideo: liveVideoURL,
      casinoChips: chips,
      buttons: {
        lobby: respOperator.operator.buttonLobby,
        support: respOperator.operator.buttonSupport,
      },
    };
  }
}
