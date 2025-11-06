import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {} from 'src/operators/domain/entities/operator-game/operator-wheel.entity';
import {
  FiguresLimits,
  OperatorLimitsWheelEntity,
} from 'src/operators/domain/entities/operator-limits/operator-limits-wheel.entity';
import { OperatorLimits } from './operator-limits.model';

@Schema()
export class OperatorLimitsWheel
  extends OperatorLimits
  implements OperatorLimitsWheelEntity
{
  @Prop()
  figures: FiguresLimits[];
}

export const OperatorLimitsWheelSchema =
  SchemaFactory.createForClass(OperatorLimitsWheel);
