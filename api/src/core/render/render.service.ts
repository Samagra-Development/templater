import { Injectable } from '@nestjs/common';
import { JinjaService } from 'src/engines/jinja/jinja.service';
import { JsTLService } from 'src/engines/jstl/jstl.service';
import { EjsService } from 'src/engines/ejs/ejs.service';
import { TransformerService } from '../transformer/transformer.service';
import {
  RenderDocGenDTO,
  RenderDocGenResponse,
  RenderDocGenTest,
  TemplateType,
} from './types';

@Injectable()
export class RenderService {
  constructor(
    private jinjaService: JinjaService,
    private jstlService: JsTLService,
    private ejsService: EjsService,
    private transformerService: TransformerService,
  ) {}

  async renderTemplate(data: RenderDocGenDTO): Promise<RenderDocGenResponse> {
    const template = data.template;
    let transformedData = data.data;
    for (const transformer of template.transformers) {
      transformedData = await this.transformerService.process(
        transformer.transformer,
        transformedData,
        transformer.path,
      );
    }
    let processed;
    switch (template.type) {
      case TemplateType.JINJA:
        processed = this.jinjaService.render(template.body, transformedData);
        break;

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
      templateType: template.type,
      data: data.data,
      template: 'test',
      meta: template.meta,
    };
  }

  renderTemplateTest(data: RenderDocGenTest): RenderDocGenResponse {
    let processed;
    let transformedData;
    try {
      transformedData = JSON.parse(data.sampleData);
    } catch (e) {
      transformedData = data.sampleData;
    }
    // for (const transformer of template.transformers) {
    //   transformedData = await this.transformerService.process(
    //     transformer.transformer,
    //     transformedData,
    //     transformer.path,
    //   );
    // }
    switch (data.type) {
      case TemplateType.JINJA:
        processed = this.jinjaService.render(data.body, transformedData);

      case TemplateType.JS_TEMPLATE_LITERALS:
        processed = this.jstlService.render(data.body, transformedData);
        break;

      case TemplateType.EJS:
        processed = this.ejsService.render(data.body, transformedData);
        break;
      default:
        throw 'Templates without template types not allowed';
    }
    return {
      processed,
      templateType: TemplateType.JS_TEMPLATE_LITERALS,
      data: data.sampleData,
      template: 'test',
    };
  }

  renderTemplateManyTest(data: RenderDocGenTest): RenderDocGenResponse {
    const processed = [];
    let transformedData;
    try {
      transformedData = JSON.parse(data.sampleData);
    } catch (e) {
      transformedData = data.sampleData;
    }
    for (let i = 0; i < transformedData.length; i++) {
      switch (data.type) {
        case TemplateType.JINJA:
          processed.push({
            __index: transformedData[i].__index,
            body: this.jinjaService.render(data.body, transformedData[i]),
          });

        case TemplateType.JS_TEMPLATE_LITERALS:
          processed.push({
            __index: transformedData[i].__index,
            body: this.jstlService.render(data.body, transformedData[i]),
          });

          break;

        case TemplateType.EJS:
          processed.push({
            __index: transformedData[i].__index,
            body: this.ejsService.render(data.body, transformedData[i]),
          });
          break;
        default:
          throw 'Templates without template types not allowed';
      }
    }
    return {
      processed,
      templateType: TemplateType.JS_TEMPLATE_LITERALS,
      data: data.sampleData,
      template: 'test',
    };
  }
}
