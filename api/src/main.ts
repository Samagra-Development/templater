import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaService } from './prisma.service';
import { stringify, parse } from 'json-bigint';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

// Handing BigInt
JSON.stringify = stringify;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
    {
      logger: ['error', 'warn', 'debug', 'verbose', 'log'],
    },
  );

  const config = new DocumentBuilder()
    .setTitle('Templater')
    .setDescription('Template Manager and Renderer')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
