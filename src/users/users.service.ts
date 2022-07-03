import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDocument } from 'src/schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user';
@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private Users: Model<UsersDocument>) {}
  async addUser(body: CreateUserDto) {
    const hash = bcrypt.hashSync(body.password, 3);
    body.password = hash;
    let user = null;
    try {
      const newUser = await this.Users.create(body);
      user = await newUser.save();
    } catch (error) {
      if (error.keyPattern.email) {
        throw new HttpException('Email Found', HttpStatus.CONFLICT);
      }
      console.log(error);
    }
    return user.toObject();
  }
  async foundByEmail(email: string) {
    return await this.Users.findOne({ email: email }).lean();
  }
  async foundById(id) {
    return await this.Users.findById(id)
      .populate({
        path: 'requestsFriends',
        model: 'Users',
        select: '_id firstName lastName email ',
        options: { lean: true },
      })
      .populate({
        path: 'requestSend',
        model: 'Users',
        select: '_id firstName lastName email ',
        options: { lean: true },
      })
      .lean();
  }
  async updateUser(id, payload) {
    return await this.Users.findByIdAndUpdate(id, { ...payload });
  }
  async getAll(query) {
    let res = [];
    if (query?.name) {
      res = await this.Users.find({
        firstName: { $regex: '.*' + query.name + '.*' },
      }).select(['-password', '-refreshToken']);
    } else {
      res = await this.Users.find().select(['-password', '-refreshToken']);
    }

    return [...res];
  }
}
