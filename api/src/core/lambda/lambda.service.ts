import { Controller, Injectable } from '@nestjs/common';
import { Lambda, Language, Prisma } from '@prisma/client';
import { LambdaJustBody, RunFeedback } from './interfaces';
import { NodeVM, VM } from 'vm2';
import { performance } from 'perf_hooks';
import ts = require('typescript');
import { PrismaService } from '../../prisma.service';
import { GrpcMethod } from '@nestjs/microservices';

// @Injectable()
@Controller()
export class LambdaService {
  vm: NodeVM;
  constructor(private prisma: PrismaService) {
    this.vm = new NodeVM({
      console: 'redirect',
      require: {
        external: false,
      },
    });
  }

  async getLambdaFromDID(did: string): Promise<Lambda> {
    // find lambda by did from Prisma. Example did = 'did:internal:1'
    // Get the last part of the did
    const didParts = did.split(':');
    const id = didParts[didParts.length - 1];
    return await this.prisma.lambda.findUnique({ where: { id: Number(id) } });
  }

  @GrpcMethod('LambdaService', 'Process')
  async processRPC(lambda: {
    body: string;
    language: Language;
    testData: any;
  }): Promise<RunFeedback> {
    return this.process(lambda, lambda.testData);
  }

  process(
    lambda: Lambda | Prisma.LambdaCreateInput | LambdaJustBody,
    data: any,
  ): RunFeedback {
    // Regex to verify function(data) signature
    const regex = /^function\s*\(([^)]*)\)\s*\{/;
    const match = regex.exec(lambda.body);
    if (!match) {
      return {
        statusCode: 3,
        statusMessage:
          'ERROR: The function signature is not valid. It should be function(data)',
        error: 'Invalid Lambda. It should start with "function(data) {"',
        response: null,
        executionTimeInMs: 0,
        consoleOutput: [],
      };
    } else {
      try {
        const startTime = performance.now();
        const consoleOutput: string[] = [];
        this.vm.on('console.log', (log) => {
          consoleOutput.push(JSON.stringify(log));
        });
        if (lambda.language === Language.TYPESCRIPT) {
          lambda.body = ts.transpile(lambda.body);
        }
        const body = `module.exports = ${lambda.body}`;
        const functionInSandbox = this.vm.run(body);
        const result = functionInSandbox(data);
        const endTime = performance.now();
        return {
          statusCode: 1,
          statusMessage: 'OK',
          error: null,
          response: result,
          consoleOutput: consoleOutput,
          executionTimeInMs: endTime - startTime,
        };
      } catch (e) {
        console.error(e);
        return {
          statusCode: 0,
          statusMessage: 'ERROR',
          error: e.message,
          response: null,
          consoleOutput: null,
          executionTimeInMs: null,
        };
      }
    }
  }
}
