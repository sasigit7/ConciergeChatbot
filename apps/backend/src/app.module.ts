import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controllers/app.controller';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { ConversationModule } from './modules/conversation/conversation.module';
import { WebSocketModule } from './modules/websocket/websocket.module';
import { RedisModule } from './modules/redis/redis.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),
    PrismaModule,
    RedisModule,
    AuthModule,
    TenantModule,
    ConversationModule,
    WebSocketModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
