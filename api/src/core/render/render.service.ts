import { Injectable } from '@nestjs/common';
import { JinjaService } from '../../engines/jinja/jinja.service';
import { JsTLService } from '../../engines/jstl/jstl.service';
import { EjsService } from '../../engines/ejs/ejs.service';
import * as types from './types';

@Injectable()
export class RenderService {
  constructor(
    private jinjaService: JinjaService,
    private jstlService: JsTLService,
    private ejsService: EjsService,
  ) {}

  test() {
    return 'test';
  }

  async renderTemplate(data: types.RenderReq): Promise<types.RenderRes> {
    const template = data.template;
    const transformedData = data.data;
    let processed;
    switch (data.engineType) {
      case types.TemplateType.JINJA:
        processed = this.jinjaService.render(template.content, transformedData);
        break;

      case types.TemplateType.JSTL:
        processed = this.jstlService.render(template.content, transformedData);
        break;

      case types.TemplateType.EJS:
        processed = this.ejsService.render(template.content, transformedData);
        break;
      default:
        throw 'Templates without template types not allowed';
    }
    return {
      processed,
      templateType: data.engineType,
      data: data.data,
      templateBody: template.content,
      meta: 'meta',
    };
  }

  renderTemplateTest(data: types.RenderTestDTO): types.RenderRes {
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

      case types.TemplateType.JSTL:
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
      templateType: types.TemplateType.JSTL,
      data: data.sampleData,
      templateBody: data.body,
    };
  }

  renderTemplateManyTest(data: types.RenderTestDTO): types.RenderRes {
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

        case types.TemplateType.JSTL:
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
      templateType: types.TemplateType.JSTL,
      data: data.sampleData,
      templateBody: data.body,
    };
  }
}
