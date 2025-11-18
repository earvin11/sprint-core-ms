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
    console.log('game', game);
    console.log('limits', limits);
    const limitsTable = {
      pleno: {
        pay: game.pleno || 0,
        min: limits.pleno?.min || 0,
        max: limits.pleno.max || 0,
      },
      semipleno: {
        pay: game.semipleno || 0,
        min: limits.semipleno?.min || 0,
        max: limits.semipleno?.max || 0,
      },
      cuadro: {
        pay: game.cuadro || 0,
        min: limits.cuadro?.min || 0,
        max: limits.cuadro?.max || 0,
      },
      calle: {
        pay: game.calle || 0,
        min: limits.calle?.min || 0,
        max: limits.calle?.max || 0,
      },
      linea: {
        pay: game.linea || 0,
        min: limits.linea?.min || 0,
        max: limits.linea?.max || 0,
      },
      columna: {
        pay: game.columna || 0,
        min: limits.columna?.min || 0,
        max: limits.columna?.max || 0,
      },
      docena: {
        pay: game.docena || 0,
        min: limits.docena?.min || 0,
        max: limits.docena?.max || 0,
      },
      chanceSimple: {
        pay: game.chanceSimple || 0,
        min: limits.chanceSimple?.min || 0,
        max: limits.chanceSimple?.max || 0,
      },
      colorBet: {
        pay: game.chanceSimple || 0,
        min: limits.colorBet?.min || 0,
        max: limits.colorBet?.max || 0,
      },
      even_odd: {
        pay: game.chanceSimple || 0,
        min: limits.even_odd?.min || 0,
        max: limits.even_odd?.max || 0,
      },
      cubre: {
        pay: game.cubre || 0,
        min: limits.cubre?.min || 0,
        max: limits.cubre?.max || 0,
      },
      specialCalle: {
        pay: game.specialCalle || 0,
        min: limits.specialCalle?.min || 0,
        max: limits.specialCalle?.max || 0,
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
