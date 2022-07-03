import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Users } from './users.schema';

export type ChatsDocument = Document & Chats;
@Schema({ timestamps: true })
export class Chats {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  userId: Users;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  friendId: Users;
}

export const ChatsSchema = SchemaFactory.createForClass(Chats);
