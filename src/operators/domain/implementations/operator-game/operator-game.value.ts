import { randomUUID } from 'crypto';
import { OperatorGameEntity } from '../../entities/operator-game/operator-game.entity';

export class OperatorGame implements OperatorGameEntity {
  public operator: string;
  public game: string;
  public uuid: string;
  public currencies: string[];
  public order?: number;

  constructor(data: OperatorGameEntity) {
    this.operator = data.operator;
    this.game = data.game;
    this.uuid = randomUUID();
    this.currencies = data.currencies;
    this.order = data.order;
  }
}
