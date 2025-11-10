import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PlayerEntity } from 'src/players/domain/entities/player.entity';

@Schema()
export class Player extends Document implements PlayerEntity {
  @Prop()
  userId: string;
  @Prop()
  username: string;
  @Prop()
  operator: string;
  @Prop()
  currency: string;
  @Prop()
  lastBalance: string;
  @Prop({ type: Boolean, default: true })
  status?: boolean;
  @Prop({ type: Boolean, default: false })
  isAdmin?: boolean;
  @Prop({ type: Boolean, default: false })
  isPhysic?: boolean;
  @Prop({ type: Boolean, default: false })
  board?: boolean;
  @Prop()
  tokenWallet: string;
  @Prop()
  WL: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
