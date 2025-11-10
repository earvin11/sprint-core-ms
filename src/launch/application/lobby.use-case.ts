import { Injectable } from '@nestjs/common';
import { ClientUseCases } from 'src/clients/application/client.use-cases';
import { OperatorUseCases } from 'src/operators/application/operator.use-cases';
import { OperatorGameUseCases } from '../../operators/application/operator-game/operator-game.use-cases';
import { OperatorLimitsUseCases } from 'src/operators/application/operator-limits/operator-limits.use-cases';
import { OperatorChipUseCases } from 'src/operators/application/operator-chip.use-cases';
import { OperatorCurrencyUseCases } from 'src/operators/application/operator-currency.use-cases';
import { OperatorGameEntity } from 'src/operators/domain/entities/operator-game/operator-game.entity';

export interface LobbyRequestInterface {
  token: string;
  operatorId: string;
  language: string;
  casinoToken: string;
  currency: string;
}
@Injectable()
export class LobbyUseCase {
  constructor(
    private readonly clientUseCases: ClientUseCases,
    private readonly operatorUseCases: OperatorUseCases,
    private readonly operatorChipUseCases: OperatorChipUseCases,
    private readonly operatorCurrencyUseCases: OperatorCurrencyUseCases,
    private readonly operatorGameUseCases: OperatorGameUseCases,
    private readonly operatorLimitsUseCases: OperatorLimitsUseCases,
  ) {}

  async run(input: LobbyRequestInterface) {
    const { operatorId, casinoToken, currency } = input;

    const operator = await this.operatorUseCases.findById(operatorId);
    if (!operator) return { error: true, message: 'Operator not found' };
    if (!operator.status || !operator.available)
      return { error: true, message: 'Operator block' };

    const client = await this.clientUseCases.findById(operator.client);
    if (!client) return { error: true, message: 'Client not found' };
    if (!client.status || !client.status)
      return { error: true, message: 'Client block or disabled' };
    if (client.token !== casinoToken)
      return { error: true, message: 'Casino token invalid' };

    const gamesInOperator = await this.operatorGameUseCases.findManyBy({
      operator,
    });
    //TODO:
    const games = gamesInOperator.map((operatorGame: OperatorGameEntity) => {
      if (operatorGame.currencies.includes(currency)) {
        return operatorGame;
      }
    });

    return {
      games,
    };
  }
}
