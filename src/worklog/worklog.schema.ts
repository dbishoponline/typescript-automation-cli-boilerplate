import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorklogDocument = Worklog & Document;

@Schema()
export class Worklog {
  @Prop({ required: true })
  datetime: Date;

  @Prop({ required: true })
  macos_user: string;

  @Prop({ required: true })
  image: Buffer;
}

export const WorklogSchema = SchemaFactory.createForClass(Worklog);
