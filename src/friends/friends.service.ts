import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FriendsDocument } from 'src/schemas/friends';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FrindsService {
  constructor(
    @InjectModel('Friends') private Friends: Model<FriendsDocument>,
    private usersService: UsersService,
  ) {}
  async getAll(id) {
    const res = await this.Friends.find({
      $or: [{ userId: id }, { friendId: id }],
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
    return this.checkHasFriend(res, id);
  }
  async addFriend(userId, friendId) {
    const user = await this.usersService.updateUser(userId, {
      $addToSet: { requestSend: friendId },
    });
    const friend = await this.usersService.updateUser(friendId, {
      $addToSet: { requestsFriends: userId },
    });
    return { requestSend: user.requestSend };
  }
  async deleteFriend(id) {
    return await this.Friends.deleteOne({
      _id: id,
    });
  }
  async acceptFriend(userId, friendId) {
    const newFriend = await this.Friends.create({
      userId,
      friendId,
    });
    const friend = await newFriend.save();
    await this.usersService.updateUser(userId, {
      $pull: { requestsFriends: friendId },
    });
    await this.usersService.updateUser(friendId, {
      $pull: { requestSend: userId },
    });
    return {
      friend,
    };
  }
  async refusalFriend(userId, friendId) {
    const user = await this.usersService.updateUser(userId, {
      $pull: { requestsFriends: friendId },
    });
    await this.usersService.updateUser(friendId, {
      $pull: { requestSend: userId },
    });
    return new HttpException('ok', 200);
  }
  checkHasFriend(friends, userId) {
    return friends.map((item) => {
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
