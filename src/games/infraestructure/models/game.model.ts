import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GameEntity, GameTypes } from 'src/games/domain/entities/game.entity';

@Schema()
export class Game extends Document implements GameEntity {
  @Prop({
    type: String,
    required: true,
    enum: GameTypes,
  })
  type: GameTypes;

  @Prop()
  name: string;
  @Prop()
  providerId: string;
  @Prop({ default: true })
  active: boolean;
  @Prop()
  urlTransmision: string;
  @Prop()
  logo: string;
  @Prop()
  alwaysOpen: boolean;
  @Prop({ unique: true })
  uuid: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
