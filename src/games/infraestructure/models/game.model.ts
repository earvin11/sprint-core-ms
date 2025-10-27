import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GameEntity, GameTypes } from 'src/games/domain/entities/game.entity';

// @Schema({ discriminatorKey: 'type' })
@Schema()
export class Game extends Document implements GameEntity {
  @Prop({ type: Boolean, default: true })
  active: boolean;
  @Prop({ type: Boolean, default: false })
  alwaysOpen: boolean;
  @Prop({ type: Number, default: 0 })
  bank: number;
  @Prop({ type: String, default: '12:00' })
  closingTime: string;
  @Prop({ type: String })
  imgBackground: string;
  @Prop({ type: String })
  language: string;
  @Prop({ type: String })
  logo: string;
  @Prop({ type: Boolean, default: false })
  manualDisable: boolean;
  @Prop({ type: String })
  name: string;
  @Prop({ type: String, default: '11:00' })
  openingTime: string;
  @Prop({ type: String })
  providerId: string;
  @Prop({ type: Boolean, default: true })
  status: boolean;
  @Prop({
    type: String,
    required: true,
    enum: GameTypes,
  })
  type: GameTypes;
  @Prop({ type: String })
  urlTransmision: string;
  @Prop({ type: Boolean, default: false })
  saveRecordings: boolean;
  @Prop({ unique: true })
  uuid: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
