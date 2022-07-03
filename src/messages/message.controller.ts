import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { MessageDto } from './dto/add-message';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessageController {
  constructor(private messagesServeice: MessagesService) {}
  @Get(':id')
  async getAll(@Param() params: { id: string }) {
    return await this.messagesServeice.getAll(params.id);
  }
  @Post()
  async addMessage(@Request() req, @Body() body: MessageDto) {
    return await this.messagesServeice.addMessage(req.user._id, body);
  }
}
