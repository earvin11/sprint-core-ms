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
  @Prop({
    type: {
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
    },
  })
  pleno: LimitBet;
  @Prop({
    type: {
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
    },
  })
  semipleno: LimitBet;
  @Prop({
    type: {
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
    },
  })
  cuadro: LimitBet;
  @Prop({
    type: {
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
    },
  })
  calle: LimitBet;
  @Prop({
    type: {
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
    },
  })
  linea: LimitBet;
  @Prop({
    type: {
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
    },
  })
  columna: LimitBet;
  @Prop({
    type: {
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
    },
  })
  docena: LimitBet;
  @Prop({
    type: {
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
    },
  })
  cubre: LimitBet;
  @Prop({
    type: {
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
    },
  })
  chanceSimple: LimitBet;
  @Prop({
    type: {
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
    },
  })
  even_odd: LimitBet;
  @Prop({
    type: {
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
    },
  })
  color: LimitBet;
  @Prop({
    type: {
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
    },
  })
  specialCalle: LimitBet;
}

export const OperatorLimitsRouletteSchema = SchemaFactory.createForClass(
  OperatorLimitsRoulette,
);
