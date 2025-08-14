import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class ConversationService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  async createConversation(tenantId: string, channel: string, customerId?: string) {
    return this.prisma.conversation.create({
      data: {
        tenantId,
        channel,
        customerId,
        status: 'active',
      },
    });
  }

  async addMessage(conversationId: string, role: string, content: string, metadata?: any) {
    return this.prisma.message.create({
      data: {
        conversationId,
        role,
        content,
        metadata,
      },
    });
  }

  async getConversation(id: string) {
    return this.prisma.conversation.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
        customer: true,
      },
    });
  }

  async getActiveConversations(tenantId: string) {
    return this.prisma.conversation.findMany({
      where: {
        tenantId,
        status: 'active',
      },
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
        customer: true,
      },
    });
  }

  async endConversation(id: string) {
    return this.prisma.conversation.update({
      where: { id },
      data: {
        status: 'closed',
        endedAt: new Date(),
      },
    });
  }

  async processMessage(conversationId: string, message: string) {
    // Add user message
    await this.addMessage(conversationId, 'user', message);

    // TODO: Implement NLP processing here
    // For now, return a simple response
    const response = "Thank you for your message. I'm here to help!";

    // Add assistant response
    await this.addMessage(conversationId, 'assistant', response);

    return response;
  }
}
