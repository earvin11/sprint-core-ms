import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OperatorGameEntity } from 'src/operators/domain/entities/operator-game/operator-game.entity';

@Schema()
export class OperatorGame extends Document implements OperatorGameEntity {
  @Prop()
  uuid: string;
  @Prop()
  operator: string;
  @Prop()
  game: string;
  @Prop()
  currencies: string[];
  @Prop({ default: 1 })
  order: number;
}

export const OperatorGameSchema = SchemaFactory.createForClass(OperatorGame);
