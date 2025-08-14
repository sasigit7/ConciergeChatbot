import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { ConversationService } from '../conversation/conversation.service';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3001', 'http://localhost:5173', 'http://localhost:4200'],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private conversationService: ConversationService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody() data: { tenantId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`tenant:${data.tenantId}`);
    client.emit('joined', { message: 'Connected to chat' });
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: { conversationId: string; message: string; tenantId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      // Process the message
      const response = await this.conversationService.processMessage(
        data.conversationId,
        data.message,
      );

      // Send response back to client
      client.emit('response', { message: response });

      // Broadcast to admin dashboard
      this.server.to(`tenant:${data.tenantId}`).emit('new-message', {
        conversationId: data.conversationId,
        message: data.message,
        response,
      });
    } catch (error) {
      client.emit('error', { message: 'Failed to process message' });
    }
  }

  @SubscribeMessage('start-conversation')
  async handleStartConversation(
    @MessageBody() data: { tenantId: string; channel: string },
    @ConnectedSocket() client: Socket,
  ) {
    const conversation = await this.conversationService.createConversation(
      data.tenantId,
      data.channel,
    );
    
    client.emit('conversation-started', { conversationId: conversation.id });
    return conversation;
  }

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody() data: { conversationId: string; isTyping: boolean },
    @ConnectedSocket() client: Socket,
  ) {
    client.broadcast.emit('user-typing', data);
  }
}
