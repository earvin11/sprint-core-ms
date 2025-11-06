import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OperatorRouletteEntity } from 'src/operators/domain/entities/operator-game/operator-game-roulette.entity';
import { OperatorLimits } from './operator-limits.model';
import {
  LimitBet,
  OperatorLimitsRouletteEntity,
} from 'src/operators/domain/entities/operator-limits/operator-limits-roulette.entity';

@Schema()
export class OperatorLimitsRoulette
  extends OperatorLimits
  implements OperatorLimitsRouletteEntity
{
  @Prop()
  pleno: LimitBet;
  @Prop()
  semipleno: LimitBet;
  @Prop()
  cuadro: LimitBet;
  @Prop()
  calle: LimitBet;
  @Prop()
  linea: LimitBet;
  @Prop()
  columna: LimitBet;
  @Prop()
  docena: LimitBet;
  @Prop()
  cubre: LimitBet;
  @Prop()
  chanceSimple: LimitBet;
  @Prop()
  even_odd: LimitBet;
  @Prop()
  color: LimitBet;
  @Prop()
  specialCalle: LimitBet;
}

export const OperatorLimitsRouletteSchema = SchemaFactory.createForClass(
  OperatorLimitsRoulette,
);
