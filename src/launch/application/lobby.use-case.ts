import { Injectable } from '@nestjs/common';
import { ClientUseCases } from 'src/clients/application/client.use-cases';
import { OperatorUseCases } from 'src/operators/application/operator.use-cases';
import { OperatorGameUseCases } from '../../operators/application/operator-game/operator-game.use-cases';
import { OperatorLimitsUseCases } from 'src/operators/application/operator-limits/operator-limits.use-cases';
import { OperatorChipUseCases } from 'src/operators/application/operator-chip.use-cases';
import { OperatorCurrencyUseCases } from 'src/operators/application/operator-currency.use-cases';

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

  async run() {}
}
