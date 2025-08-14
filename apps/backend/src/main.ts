import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { 
    logger: ['error', 'warn', 'log', 'debug', 'verbose'] 
  });
  
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port');
  const corsOptions = configService.get('app.cors');
  
  // Enable CORS
  app.enableCors(corsOptions);
  
  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  
  // API prefix
  app.setGlobalPrefix('api');
  
  await app.listen(port);
  console.log(`🚀 Backend is running on: http://localhost:${port}/api`);
  console.log(`🔌 WebSocket server is running on: ws://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap backend', err);
  process.exit(1);
});
