import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Template, TemplateType, Prisma, Lambda } from '@prisma/client';
import { RenderDto, RenderResponse } from '../dto/render';
import { PrismaService } from '../../prisma.service';
import { RunFeedback } from './interfaces';
import { LambdaService } from './lambda.service';

@Controller('lambda')
export class LambdaController {
  constructor(
    private readonly lambdaService: LambdaService,
    private prisma: PrismaService,
  ) {}

  @Post('/process')
  async render(@Body() renderDto: RenderDto): Promise<RunFeedback> {
    const lambda = await this.prisma.lambda.findUnique({
      where: { id: Number(renderDto.id) },
    });
    console.log({ lambda });
    return this.lambdaService.process(lambda, renderDto.data);
  }

  @Post('/')
  async addLambda(
    @Body() data: { lambda: Prisma.LambdaCreateInput; testData: any },
  ): Promise<Lambda | RunFeedback> {
    const testDataProcessResult = this.lambdaService.process(
      data.lambda,
      data.testData,
    );
    if (testDataProcessResult.statusCode === 1) {
      return this.prisma.lambda.create({
        data: data.lambda,
      });
    } else {
      console.error(
        "Can't add lambda, test data failed",
        testDataProcessResult,
      );
      return testDataProcessResult;
    }
  }

  @Delete('/:id')
  async deleteTemplate(@Param('id') id: string): Promise<Lambda> {
    return this.prisma.lambda.delete({ where: { id: Number(id) } });
  }

  @Get('/:id')
  async getTemplate(@Param('id') id: string): Promise<Lambda> {
    return this.prisma.lambda.findUnique({ where: { id: Number(id) } });
  }
}
