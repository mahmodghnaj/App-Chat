import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { DtoAddChat } from './dto/add-chat';

@Controller('chats')
export class ChatsController {
  constructor(private chatsService: ChatsService) {}
  @Get()
  async getAll(@Request() req) {
    return await this.chatsService.getAll(req.user._id);
  }
  @Post()
  async addChat(@Request() req, @Body() body: DtoAddChat) {
    return await this.chatsService.addChat(req.user._id, body.friendId);
  }
  @Delete(':friendId')
  async deleteFrinds(@Param() param: DtoAddChat) {
    return await this.chatsService.deleteChat(param.friendId);
  }
}
