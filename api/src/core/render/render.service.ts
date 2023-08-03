import { Injectable } from '@nestjs/common';
import { JinjaService } from 'src/engines/jinja/jinja.service';
import { JsTLService } from 'src/engines/jstl/jstl.service';
import { EjsService } from 'src/engines/ejs/ejs.service';
import * as types from './types';

@Injectable()
export class RenderService {
  constructor(
    private jinjaService: JinjaService,
    private jstlService: JsTLService,
    private ejsService: EjsService,
  ) {}

  async renderTemplate(data: types.RenderDTO): Promise<types.RenderResponse> {
    const template = data.template;
    const transformedData = data.data;
    let processed;
    switch (template.type) {
      case types.TemplateType.JINJA:
        processed = this.jinjaService.render(template.body, transformedData);
        break;

      case types.TemplateType.JS_TEMPLATE_LITERALS:
        processed = this.jstlService.render(template.body, transformedData);
        break;

      case types.TemplateType.EJS:
        processed = this.ejsService.render(template.body, transformedData);
        break;
      default:
        throw 'Templates without template types not allowed';
    }
    return {
      processed,
      templateType: template.type,
      data: data.data,
      templateBody: template.body,
      meta: 'meta',
    };
  }

  renderTemplateTest(data: types.RenderTestDTO): types.RenderResponse {
    let processed;
    let transformedData;
    try {
      transformedData = JSON.parse(data.sampleData);
    } catch (e) {
      transformedData = data.sampleData;
    }
    switch (data.type) {
      case types.TemplateType.JINJA:
        processed = this.jinjaService.render(data.body, transformedData);

      case types.TemplateType.JS_TEMPLATE_LITERALS:
        processed = this.jstlService.render(data.body, transformedData);
        break;

      case types.TemplateType.EJS:
        processed = this.ejsService.render(data.body, transformedData);
        break;
      default:
        throw 'Templates without template types not allowed';
    }
    return {
      processed,
      templateType: types.TemplateType.JS_TEMPLATE_LITERALS,
      data: data.sampleData,
      templateBody: data.body,
    };
  }

  renderTemplateManyTest(data: types.RenderTestDTO): types.RenderResponse {
    const processed = [];
    let transformedData;
    try {
      transformedData = JSON.parse(data.sampleData);
    } catch (e) {
      transformedData = data.sampleData;
    }
    for (let i = 0; i < transformedData.length; i++) {
      switch (data.type) {
        case types.TemplateType.JINJA:
          processed.push({
            __index: transformedData[i].__index,
            body: this.jinjaService.render(data.body, transformedData[i]),
          });

        case types.TemplateType.JS_TEMPLATE_LITERALS:
          processed.push({
            __index: transformedData[i].__index,
            body: this.jstlService.render(data.body, transformedData[i]),
          });

          break;

        case types.TemplateType.EJS:
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
      templateType: types.TemplateType.JS_TEMPLATE_LITERALS,
      data: data.sampleData,
      templateBody: data.body,
    };
  }
}
