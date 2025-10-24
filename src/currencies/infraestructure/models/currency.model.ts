import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CurrencyEntity } from 'src/currencies/domain/currency.entity';

@Schema()
export class Currency extends Document implements CurrencyEntity {
  @Prop()
  name: string;
  @Prop()
  short: string;
  @Prop()
  symbol: string;
  @Prop()
  usdExchange: number;
  @Prop({ default: true })
  exchangeApi: boolean;
  @Prop({ default: true })
  status: boolean;
  @Prop()
  uuid: string;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);
