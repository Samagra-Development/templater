import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { Template, TemplateType, Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma.service';
import { TransformerService } from '../../transformer/transformer.service';
import { RenderDto, RenderDtoTest, RenderResponse } from '../../dto/render';
import { JsTLService } from 'src/engines/jstl/jstl.service';
import { TemplateService } from '../../template/template.service';
import { JinjaService } from 'src/engines/jinja/jinja.service';
import { EjsService } from 'src/engines/ejs/ejs.service';

@Controller('i18n')
export class I18nController {
  constructor(
    private readonly jinjaService: JinjaService,
    private readonly ejsService: EjsService,
    private readonly prisma: PrismaService,
    private readonly transformerService: TransformerService,
    private readonly templateService: TemplateService,
    private readonly jstlService: JsTLService,
  ) {}

  @Post()
  async addTemplate(
    @Body() templateData: Prisma.TemplateCreateInput,
  ): Promise<Template> {
    const hasDuplicate = (arrayObj, colName) => {
      var hash = Object.create(null);
      return arrayObj.some((arr) => {
        return (
          arr[colName] && (hash[arr[colName]] || !(hash[arr[colName]] = true))
        );
      });
    };
    const isDuplicate: Boolean = hasDuplicate(
      templateData.bodyI18n.createMany.data,
      'lang',
    );
    if (isDuplicate) {
      throw new BadRequestException('Duplicate language codes not allowed');
    } else {
      return this.templateService.createTemplate(templateData);
    }
  }

  @Post('process')
  async render(@Body() renderDto: RenderDto): Promise<RenderResponse> {
    let processed;
    let template;
    if (renderDto.data.lang == null) {
      processed = [];
      template = await this.prisma.template.findUnique({
        where: { id: renderDto.id },
        include: {
          transformers: {
            include: {
              transformer: true,
            },
          },
          bodyI18n: {
            select: {
              body: true,
              lang: true,
            },
          },
        },
      });
      const bodyArr = template.bodyI18n;
      if (bodyArr.length > 0) {
        bodyArr.forEach(async (element) => {
          let transformedData = renderDto.data;
          for (const transformer of template.transformers) {
            transformedData = await this.transformerService.process(
              transformer.transformer,
              transformedData,
              transformer.path,
            );
          }
          let proc;
          switch (template.type) {
            case TemplateType.JINJA:
              proc = this.jinjaService.render(element.body, transformedData);

            case TemplateType.JS_TEMPLATE_LITERALS:
              proc = this.jstlService.render(element.body, transformedData);
              break;

            case TemplateType.EJS:
              proc = this.ejsService.render(element.body, transformedData);
              break;
            default:
              throw 'Templates without template types not allowed';
          }
          console.log({ lang: element.lang, processed: proc });
          processed.push({ lang: element.lang, processed: proc });
        });
      } else {
        processed = {
          err: 'No template found for type ' + renderDto.data.type,
        };
      }
    } else {
      template = await this.prisma.template.findUnique({
        where: { id: renderDto.id },
        include: {
          transformers: {
            include: {
              transformer: true,
            },
          },
          bodyI18n: {
            where: { lang: renderDto.data.lang },
          },
        },
      });
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
          processed = this.jinjaService.render(
            template.bodyI18n[0].body,
            transformedData,
          );

        case TemplateType.JS_TEMPLATE_LITERALS:
          processed = this.jstlService.render(
            template.bodyI18n[0].body,
            transformedData,
          );
          break;

        case TemplateType.EJS:
          processed = this.ejsService.render(
            template.bodyI18n[0].body,
            transformedData,
          );
          break;
        default:
          throw 'Templates without template types not allowed';
      }
    }
    return {
      processed,
      templateType: TemplateType.JS_TEMPLATE_LITERALS,
      data: renderDto.data,
      template: 'test',
      meta: template.meta,
    };
  }
}
