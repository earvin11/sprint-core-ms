import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OperatorGame } from './operator-game.model';
import { OperatorRouletteEntity } from 'src/operators/domain/entities/operator-game/operator-game-roulette.entity';

@Schema()
export class OperatorRoulette
  extends OperatorGame
  implements OperatorRouletteEntity
{
  @Prop({ default: 36 })
  pleno: number;

  @Prop({ default: 18 })
  semipleno: number;

  @Prop({ default: 9 })
  cuadro: number;

  @Prop({ default: 12 })
  calle: number;

  @Prop({ default: 6 })
  linea: number;

  @Prop({ default: 3 })
  columna: number;

  @Prop({ default: 2 })
  docena: number;

  @Prop({ default: 2 })
  chanceSimple: number;

  @Prop({ default: 12 })
  cubre: number;

  @Prop({ default: 7 })
  specialCalle: number;

  // @Prop({ default: 2 })
  // evenOdd: number;

  // @Prop({ default: 2 })
  // color: number;
}

export const OperatorRouletteSchema =
  SchemaFactory.createForClass(OperatorRoulette);
