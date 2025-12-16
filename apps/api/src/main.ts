import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Increase payload limit for image uploads
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      // Allow localhost
      if (origin.includes('localhost')) return callback(null, true);
      // Allow TestSprite tunnel domains
      if (origin.includes('testsprite.com') || origin.includes('ngrok')) return callback(null, true);
      
      callback(null, true); // Fallback: Allow all for development debugging
    },
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
