import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OperatorCurrencyEntity } from 'src/operators/domain/entities/operator-currency.entity';

@Schema()
export class OperatorCurrency
  extends Document
  implements OperatorCurrencyEntity
{
  @Prop()
  operator: string;
  @Prop()
  currency: string;
}

export const OperatorCurrencySchema =
  SchemaFactory.createForClass(OperatorCurrency);
