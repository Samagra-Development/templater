import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Template, TemplateType, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { TransformerService } from '../transformer/transformer.service';
import { RenderDto, RenderResponse } from '../dto/render';
import { JsTLService } from 'src/engines/jstl/jstl.service';
import { TemplateService } from './template.service';
import { JinjaService } from 'src/engines/jinja/jinja.service';
import { EjsService } from 'src/engines/ejs/ejs.service';

@Controller('/')
export class TemplateController {
  constructor(
    private readonly jinjaService: JinjaService,
    private readonly ejsService: EjsService,
    private readonly prisma: PrismaService,
    private readonly transformerService: TransformerService,
    private readonly templateService: TemplateService,
    private readonly jstlService: JsTLService,
  ) {}

  @Post('/process')
  async render(@Body() renderDto: RenderDto): Promise<RenderResponse> {
    const template = await this.prisma.template.findUnique({
      where: { id: renderDto.id },
      include: {
        transformers: {
          include: {
            transformer: true,
          },
        },
      },
    });
    let processed;

    let transformedData = renderDto.data;
    for (const transformer of template.transformers) {
      transformedData = await this.transformerService.process(
        transformer.transformer,
        transformedData,
        transformer.path,
      );
    }
    switch (template.type) {
      case TemplateType.JINJA:
        processed = this.jinjaService.render(template.body, transformedData);

      case TemplateType.JS_TEMPLATE_LITERALS:
        processed = this.jstlService.render(template.body, transformedData);
        break;

      case TemplateType.EJS:
        processed = this.ejsService.render(template.body, transformedData);
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
