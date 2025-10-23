import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ClientEntity } from 'src/clients/domain/entities/client.entity';

@Schema()
export class Client extends Document implements ClientEntity {
  @Prop()
  name: string;
  @Prop()
  uuid: string;
  @Prop()
  logo: string;
  @Prop()
  loaderLogo: string;
  @Prop()
  token: string;
  @Prop()
  endpointAuth: string;
  @Prop()
  endpointBet: string;
  @Prop()
  endpointWin: string;
  @Prop()
  endpointRollback: string;
  @Prop({ default: true })
  status: boolean;
  @Prop({ default: true })
  available?: boolean;
  @Prop({ default: false })
  useLogo?: boolean;
  @Prop()
  urlGames: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
