import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Prisma, Lambda, Transformer, TransformerType } from '@prisma/client';
import { response } from 'express';
import { sample } from 'rxjs';
import { RenderDto, SampleData } from 'src/dto/render';
import { RunFeedback } from 'src/lambda/interfaces';
import { LambdaService } from 'src/lambda/lambda.service';
import { PrismaService } from 'src/prisma.service';
import { TransformerService } from './transformer.service';

@Controller('transformer')
export class TransformerController {
  constructor(
    private readonly transformerService: TransformerService,
    private prisma: PrismaService,
  ) {}

  @Post('/process')
  async render(@Body() renderDto: RenderDto): Promise<RunFeedback> {
    const transformer = await this.prisma.transformer.findUnique({
      where: { id: Number(renderDto.id) },
    });
    let result;
    if (transformer.type === TransformerType.OPTIONS) {
      result = this.transformerService.processOptions(
        transformer,
        renderDto.data,
        renderDto.path,
      );
    } else if (transformer.type === TransformerType.FUNCTION_INTERNAL) {
      result = this.transformerService.processInternalFunction(
        transformer,
        renderDto.data,
        renderDto.path,
      );
    } else {
      // return not implemented as LambdaRunFeedback
      return {
        statusCode: 2,
        statusMessage: 'Transformer type not implemented',
        error: 'Transformer type not implemented',
        response: null,
        executionTimeInMs: 0,
        consoleOutput: [],
      };
    }
    return {
      statusCode: 1,
      statusMessage: 'SUCCESS',
      error: null,
      response: result,
      executionTimeInMs: 0,
      consoleOutput: [],
    };
  }

  @Post('/test')
  async test(
    @Body()
    data: {
      transformer: Prisma.TransformerCreateInput;
      sample: SampleData;
    },
  ): Promise<RunFeedback> {
    let result;
    if (data.transformer.type === TransformerType.OPTIONS) {
      result = this.transformerService.processOptions(
        data.transformer,
        data.sample.data,
        data.sample.path,
      );
    } else if (data.transformer.type === TransformerType.FUNCTION_INTERNAL) {
      result = this.transformerService.processInternalFunction(
        data.transformer,
        data.sample.data,
        data.sample.path,
      );
    } else {
      // return not implemented as LambdaRunFeedback
      return {
        statusCode: 2,
        statusMessage: 'Transformer type not implemented',
        error: 'Transformer type not implemented',
        response: null,
        executionTimeInMs: 0,
        consoleOutput: [],
      };
    }
    if (JSON.stringify(result) === JSON.stringify(data.sample.response)) {
      return {
        statusCode: 1,
        statusMessage: 'Test successful',
        error: null,
        response: result,
        executionTimeInMs: 0,
        consoleOutput: [],
      };
    } else {
      return {
        statusCode: 0,
        statusMessage: 'Test failed',
        error: 'Test failed',
        response: result,
        executionTimeInMs: 0,
        consoleOutput: [],
      };
    }
  }

  @Post('/')
  async addLambda(
    @Body() data: Prisma.TransformerCreateInput,
  ): Promise<Transformer> {
    return this.prisma.transformer.create({
      data,
    });
  }

  @Delete('/:id')
  async deleteTemplate(@Param('id') id: string): Promise<Transformer> {
    return this.prisma.transformer.delete({ where: { id: Number(id) } });
  }

  @Get('/:id')
  async getTemplate(@Param('id') id: string): Promise<Transformer> {
    return this.prisma.transformer.findUnique({ where: { id: Number(id) } });
  }
}
