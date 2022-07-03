import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { DtoAddFriend } from './dto/add-friend';
import { FrindsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FrindsService) {}
  @Get()
  async getAll(@Request() req) {
    return await this.friendsService.getAll(req.user._id);
  }
  @Post()
  async addFriend(@Request() req, @Body() body: DtoAddFriend) {
    return await this.friendsService.addFriend(req.user._id, body.friendId);
  }
  @Delete(':friendId')
  async deleteFrinds(@Request() req, @Param() Param: DtoAddFriend) {
    return await this.friendsService.deleteFriend(Param.friendId);
  }
  @Post('accept-friend')
  async acceptFriend(@Request() req, @Body() body: DtoAddFriend) {
    return await this.friendsService.acceptFriend(req.user._id, body.friendId);
  }
  @Post('refusal-friend')
  async refusalFriend(@Request() req, @Body() body: DtoAddFriend) {
    return await this.friendsService.refusalFriend(req.user._id, body.friendId);
  }
}
