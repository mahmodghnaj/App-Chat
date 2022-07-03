import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Messages, MessagesSchema } from 'src/schemas/messages';
import { MessageController } from './message.controller';
import { MessageGetWay } from './message.gateway';
import { MessagesService } from './messages.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: 60 * 15 },
    }),
    MongooseModule.forFeature([{ name: 'Messages', schema: MessagesSchema }]),
  ],
  controllers: [MessageController],
  providers: [MessagesService, MessageGetWay],
  exports: [MessagesService],
})
export class MessagesModule {}
