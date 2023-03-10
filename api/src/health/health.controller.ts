import { Controller, Get, Inject } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  GRPCHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PrismaHealthIndicator } from './prisma.health';
import { ClientGrpc } from '@nestjs/microservices';
import { Language } from '@prisma/client';
import { LambdaService } from '../core/lambda/lambda.service';

@Controller()
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private grpc: GRPCHealthIndicator,
    @Inject('lambda_package') private client: ClientGrpc,
    private prismaIndicator: PrismaHealthIndicator,
  ) {}

  @Get('/health')
  @HealthCheck()
  @ApiOperation({ summary: 'Get Health Check Status' })
  @ApiResponse({
    status: 200,
    description: 'Result Report for All the Health Check Services',
  })
  async checkHealth() {
    return this.health.check([
      async () => this.prismaIndicator.isHealthy('Db'),
      async () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      async () =>
        this.grpc.checkService('GRPC', 'LambdaService', {
          healthServiceCheck: (healthService: any, serviceName: string) => {
            return new Promise((resolve, reject) => {
              const service =
                this.client.getService<LambdaService>(serviceName);
              if (!service) {
                reject();
              }

              // @ts-ignore
              const observable = service.Process({
                body: 'function(data) { return `Hello ${data.name}!`; }',
                language: Language.JAVASCRIPT,
                testData: `{"name": "dummy"}`,
              });

              observable.subscribe((value) => {
                if (value) {
                  resolve({ status: 1 });
                } else {
                  resolve({ status: 2 });
                }
              });
            });
          },
        }),
    ]);
  }
}
