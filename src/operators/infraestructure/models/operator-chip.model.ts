import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OperatorChipEntity } from 'src/operators/domain/entities/operator-chip.entity';

@Schema()
export class OperatorChip extends Document implements OperatorChipEntity {
  @Prop()
  operator: string;
  @Prop()
  currency: string;
  @Prop()
  number: string;
  @Prop()
  value: number;
  @Prop()
  color: string;
  @Prop({ type: Boolean, default: true })
  active?: boolean;
  @Prop()
  order: number;
}

export const OperatorChipSchema = SchemaFactory.createForClass(OperatorChip);
