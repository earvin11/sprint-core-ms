import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OperatorEntity } from 'src/operators/domain/entities/operator.entity';

@Schema()
export class Operator extends Document implements OperatorEntity {
  @Prop()
  name: string;
  @Prop()
  uuid: string;
  @Prop()
  client: string;
  @Prop({ default: true })
  status: boolean;
  @Prop()
  endpointAuth: string;
  @Prop()
  endpointBet: string;
  @Prop()
  endpointWin: string;
  @Prop()
  endpointRollback: string;
  @Prop()
  casinoToken: string;
  @Prop({ type: Boolean, default: true })
  available?: boolean;
  @Prop({ type: Boolean, default: true })
  buttonLobby: boolean;
  @Prop({ type: Boolean, default: true })
  buttonSupport?: boolean;
  @Prop()
  urlGames?: string;
  @Prop()
  background?: string;
  @Prop()
  logo?: string;
  @Prop()
  cruppierLogo?: string;
  @Prop()
  primaryColor?: string;
  @Prop()
  secondaryColor?: string;
  @Prop({ default: false })
  useLogo?: boolean;
  @Prop()
  loaderLogo?: string;
}

export const OperatorSchema = SchemaFactory.createForClass(Operator);
