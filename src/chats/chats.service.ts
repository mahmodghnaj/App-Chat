import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessagesService } from 'src/messages/messages.service';
import { ChatsDocument } from 'src/schemas/chats.schema';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel('Chats') private Chats: Model<ChatsDocument>,
    private messagesService: MessagesService,
  ) {}
  async getAll(userId) {
    const res = await this.Chats.find({
      $or: [{ userId: userId }, { friendId: userId }],
    })
      .populate({
        path: 'friendId',
        select: ['firstName', 'lastName', 'email'],
      })
      .populate({
        path: 'userId',
        select: ['firstName', 'lastName', 'email'],
      })
      .lean();
    return this.checkHasChat(res, userId);
  }
  async addChat(userId, friendId) {
    if (userId == friendId) {
      throw new HttpException('Bad', 400);
    }
    const chatFound = await this.Chats.findOne({
      userId: userId,
      friendId: friendId,
    });
    if (chatFound) {
      throw new HttpException('Alredae Chat have', 400);
    }
    const newChat = await this.Chats.create({
      userId,
      friendId,
    });
    const chat = await (
      await newChat.save()
    ).populate({
      path: 'friendId',
      select: ['firstName', 'lastName', 'email'],
    });
    return {
      chat,
    };
  }

  async deleteChat(id) {
    await this.Chats.findByIdAndDelete(id);
    return await this.messagesService.deleteMessages(id);
  }

  checkHasChat(chats, userId) {
    return chats.map((item) => {
      if (item.friendId._id == userId) {
        return {
          ...item,
          userId: item.friendId,
          friendId: item.userId,
        };
      }
      return item;
    });
  }
}
