import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Users } from './users.schema';

export type FriendsDocument = Document & Friends;
@Schema({ timestamps: true })
export class Friends {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  userId: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  friendId: Users[];
}

export const FriendsSchema = SchemaFactory.createForClass(Friends);
