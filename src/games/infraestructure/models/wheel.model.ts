import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Game } from './game.model';
import { WheelEntity } from 'src/games/domain/entities/wheel.entity';

@Schema()
export class Wheel extends Game implements WheelEntity {
  // uuid: String,
  @Prop({ type: Number, default: 95 })
  percentReturnToPlayer: number;
  @Prop({
    type: [
      {
        number: Number,
        multiplier: Number,
      },
    ],
    required: true,
  })
  betPays: Object;
  // @Prop({ type: String })
  // launchURL: string;
  @Prop({ type: Number, default: 2 })
  timeOne: number;
  @Prop({ type: Number, default: -3 })
  timeTwo: number;
  @Prop({ type: Number, default: -10 })
  timeThree: number;
  @Prop({ type: Number, default: 0 })
  aditionalTime: number;
  @Prop({ type: Number, default: 6 })
  maxBetFigures: number;
}

export const WheelSchema = SchemaFactory.createForClass(Wheel);
