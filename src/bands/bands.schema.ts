import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type bandsDocument = bands & Document;

@Schema({
  timestamps: true,
})
export class bands {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: [String], required: true })
  members: string[];

  @Prop({ type: Number, required: true })
  albums: number;
}

export const bandsSchema = SchemaFactory.createForClass(bands);
