import { Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessagesService } from './messages.service';

@WebSocketGateway({ cors: '*:*' })
export class MessageGetWay implements OnGatewayConnection {
  constructor(
    private jwtService: JwtService,
    private messageService: MessagesService,
  ) {}
  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket) {
    try {
      const user = await this.jwtService.verify(
        socket.handshake.headers.authorization.split(' ')[1],
      );
      socket.data = { user: user, ...socket.data };
    } catch (error) {
      socket.emit('error', 'authorization');
      socket.disconnect();
    }
  }
  @SubscribeMessage('mesToserver')
  async handelMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    const message = await this.messageService.addMessage(
      client.data.user._id,
      data,
    );
    this.server.emit('msgToClient', message);
  }
}
