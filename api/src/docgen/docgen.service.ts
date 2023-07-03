import { Injectable } from '@nestjs/common';
import { Template } from '@prisma/client';
import { RenderDto, RenderResponse } from 'src/core/dto/render';
import { TemplateService } from 'src/core/template/template.service';
import { TransformerService } from 'src/core/transformer/transformer.service';
import { EjsService } from 'src/engines/ejs/ejs.service';
import { JinjaService } from 'src/engines/jinja/jinja.service';
import { JsTLService } from 'src/engines/jstl/jstl.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DocgenService {
  constructor(
    private readonly jinjaService: JinjaService,
    private readonly ejsService: EjsService,
    private readonly transformerService: TransformerService,
    private readonly templateService: TemplateService,
    private readonly prisma: PrismaService,
    private readonly jstlService: JsTLService,
  ) {}

  // render method returns the processed template string which is then passed to the build file method
  async render(renderDto: RenderDto): Promise<RenderResponse> {
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
      case 'JINJA':
        processed = this.jinjaService.render(template.body, transformedData);
        break;

      case 'JS_TEMPLATE_LITERALS':
        processed = this.jstlService.render(template.body, transformedData);
        break;

      case 'EJS':
        processed = this.ejsService.render(template.body, transformedData);
        break;
      default:
        throw 'Templates without template types not allowed';
    }
    // processed is the template_string which ideally we would pass to build the document
    return {
      processed,
      templateType: template.type,
      data: renderDto.data,
      template: template.body,
    };
  }

  // CRUD methods for templates
  // used in register_template in DocGen
  async createTemplate(template: Template) {
    return this.prisma.template.create({
      data: template,
    });
  }

  async getTemplates() {
    return this.prisma.template.findMany();
  }

  async getTemplate(id: number) {
    return this.prisma.template.findUnique({
      where: { id },
    });
  }
}
