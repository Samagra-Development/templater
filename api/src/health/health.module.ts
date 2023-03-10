import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TerminusModule } from '@nestjs/terminus';
import { join } from 'path';
import { PrismaService } from 'src/prisma.service';
import { PrismaHealthIndicator } from './prisma.health';
import { HealthController } from './health.controller';

@Module({
  imports: [
    TerminusModule,
    HttpModule,
    ClientsModule.register([
      {
        name: 'lambda_package',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: 'lambda',
          protoPath: join(__dirname, '../proto/lambda.proto'),
          loader: {
            keepCase: true,
            enums: String,
            oneofs: true,
            arrays: true,
            objects: true,
          },
        },
      },
    ]),
  ],
  controllers: [HealthController],
  providers: [PrismaService, PrismaHealthIndicator],
})
export class HealthModule {}
