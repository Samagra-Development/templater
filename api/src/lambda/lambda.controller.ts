import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Template, TemplateType, Prisma, Lambda } from '@prisma/client';
import { RenderDto, RenderResponse } from 'src/dto/render';
import { PrismaService } from 'src/prisma.service';
import { LambdaRunFeedback } from './interfaces';
import { LambdaService } from './lambda.service';

@Controller('lambda')
export class LambdaController {
  constructor(
    private readonly lambdaService: LambdaService,
    private prisma: PrismaService,
  ) {}

  @Post('/process')
  async render(@Body() renderDto: RenderDto): Promise<LambdaRunFeedback> {
    return this.lambdaService.process(
      await this.prisma.lambda.findUnique({
        where: { id: Number(renderDto.id) },
      }),
      renderDto.data,
    );
  }

  @Post('/')
  async addLambda(
    @Body() data: Prisma.LambdaCreateInput,
    testData: any,
  ): Promise<Lambda> {
    if (this.lambdaService.process(data, testData).statusCode === 1) {
      return this.prisma.lambda.create({
        data,
      });
    } else {
      throw new Error('Lambda not valid');
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
