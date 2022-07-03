import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessagesDocument } from 'src/schemas/messages';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('Messages') private Messages: Model<MessagesDocument>,
  ) {}
  async getAll(id) {
    const res = await this.Messages.find({ chatId: id });
    return [...res];
  }
  async addMessage(sendrId, body) {
    const message = await this.Messages.create({
      chatId: body.chatId,
      sender: sendrId,
      message: body.message,
    });
    await message.save();
    return {
      message,
    };
  }
  async deleteMessages(id) {
    return await this.Messages.deleteMany({ chatId: id });
  }
}
