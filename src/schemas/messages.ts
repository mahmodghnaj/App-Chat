import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Chats } from './chats.schema';
import * as mongoose from 'mongoose';

export type MessagesDocument = Document & Messages;

@Schema({ timestamps: true })
export class Messages {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  chatId: Chats[];
  @Prop()
  sender: string;
  @Prop()
  message: string;
}

export const MessagesSchema = SchemaFactory.createForClass(Messages);
