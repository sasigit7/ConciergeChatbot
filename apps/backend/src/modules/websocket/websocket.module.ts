import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ConversationModule } from '../conversation/conversation.module';

@Module({
  imports: [ConversationModule],
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export class WebSocketModule {}
