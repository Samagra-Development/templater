import { AppModule } from './app.module';
import { RPCModule } from './rpc.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaService } from './prisma.service';
import { stringify, parse } from 'json-bigint';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';

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
  app.enableCors();

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50052',
      package: 'lambda',
      protoPath: join(__dirname, 'proto/lambda.proto'),
      loader: {
        keepCase: true,
        enums: String,
        oneofs: true,
        arrays: true,
        objects: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
