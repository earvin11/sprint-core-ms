import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CrupierEntity } from 'src/crupiers/domain/crupier.entity';

@Schema()
export class Crupier extends Document implements CrupierEntity {
  @Prop()
  name: string;
  @Prop()
  uuid: string;
  @Prop()
  serialId?: string;
  @Prop()
  photoUrl?: string;
}

export const CrupierSchema = SchemaFactory.createForClass(Crupier);
