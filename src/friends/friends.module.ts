import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { FriendsSchema } from 'src/schemas/friends';
import { UsersModule } from 'src/users/users.module';
import { FriendsController } from './friends.controller';
import { FrindsService } from './friends.service';

@Module({
  controllers: [FriendsController],
  providers: [FrindsService],
  imports: [
    MongooseModule.forFeature([{ name: 'Friends', schema: FriendsSchema }]),
    UsersModule,
  ],
})
export class FriendsModule {}
