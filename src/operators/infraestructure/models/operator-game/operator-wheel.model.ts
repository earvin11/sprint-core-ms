import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OperatorGame } from './operator-game.model';
import {
  ConfigPayment,
  OperatorWheelEntity,
} from 'src/operators/domain/entities/operator-game/operator-wheel.entity';

@Schema()
export class OperatorWheel extends OperatorGame implements OperatorWheelEntity {
  @Prop()
  configPayment: ConfigPayment[];
}

export const OperatorWheelSchema = SchemaFactory.createForClass(OperatorWheel);
