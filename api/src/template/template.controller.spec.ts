import { Test, TestingModule } from '@nestjs/testing';
import { TemplateType } from '@prisma/client';
import { RenderDto, RenderResponse } from '../dto/render';
import { TemplateController } from './template.controller';

describe('TemplateController', () => {
  let controller: TemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateController],
    }).compile();

    controller = module.get<TemplateController>(TemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('root', () => {
    it('should render template', () => {
      const data: RenderDto = {
        id: 1,
        data: {
          test: 'data',
        },
      };

      const response: RenderResponse = {
        processed: 'string',
        templateType: TemplateType.JS_TEMPLATE_LITERALS,
        data: data.data,
        template: 'test',
      };
      expect(controller.render(data)).toBe(response);
    });
  });
});
