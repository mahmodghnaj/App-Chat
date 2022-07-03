import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema({ timestamps: true })
export class Users {
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  refreshToken: string;
  @Prop({ type: [mongoose.Schema.Types.ObjectId], unique: true })
  requestSend: Users[];
  @Prop({ type: [mongoose.Schema.Types.ObjectId], unique: true })
  requestsFriends: Users[];
}

export const UsersSchema = SchemaFactory.createForClass(Users);
