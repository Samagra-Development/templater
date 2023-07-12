import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Template, Prisma } from '@prisma/client';
import { RenderDto, RenderDtoTest, RenderResponse } from '../dto/render';
import { TemplateService } from './template.service';
import { RenderService } from '../render/render.service';

@Controller('/')
export class TemplateController {
  constructor(
    private readonly templateService: TemplateService,
    private readonly renderService: RenderService,
  ) {}

  @Get('/list')
  async list(): Promise<Template[]> {
    return this.templateService.templates({});
  }

  @Post('/process')
  async render(@Body() renderDto: RenderDto): Promise<RenderResponse> {
    return this.renderService.renderTemplate(renderDto);
  }

  @Post('/process/test')
  async renderTest(@Body() data: RenderDtoTest): Promise<RenderResponse> {
    return this.renderService.renderTemplateTest(data);
  }

  @Post('/process/testMany')
  async renderTestMany(@Body() data: RenderDtoTest): Promise<RenderResponse> {
    return this.renderService.renderTemplateManyTest(data);
  }

  @Post('/')
  async addTemplate(
    @Body() templateData: Prisma.TemplateCreateInput,
  ): Promise<Template> {
    return this.templateService.createTemplate(templateData);
  }

  @Delete('/:id')
  async deleteTemplate(@Param('id') id: string): Promise<Template> {
    return this.templateService.deleteTemplate({ id: Number(id) });
  }
}
