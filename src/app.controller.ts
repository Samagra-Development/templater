import { Prisma, Template, TemplateType } from '.prisma/client';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { RenderDto, RenderResponse } from './dto/render';
import { JsTLService } from './jstl/jstl.service';
import { TemplateService } from './template/template.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly templateService: TemplateService,
    private readonly jstlService: JsTLService,
  ) {}

  @Post('/process')
  async render(@Body() renderDto: RenderDto): Promise<RenderResponse> {
    const template: Template = await this.templateService.template({
      id: renderDto.id,
    });
    let processed;

    switch (template.type) {
      case TemplateType.JINJA:
        throw 'Not implemented';

      case TemplateType.JS_TEMPLATE_LITERALS:
        processed = this.jstlService.render(template.body, renderDto.data);
        break;
      default:
        throw 'Templates without template types not allowed';
    }
    return {
      processed,
      templateType: TemplateType.JS_TEMPLATE_LITERALS,
      data: renderDto.data,
      template: 'test',
      meta: template.meta,
    };
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

  @Get('/:id')
  async getTemplate(@Param('id') id: string): Promise<Template> {
    return this.templateService.template({ id: Number(id) });
  }
}
