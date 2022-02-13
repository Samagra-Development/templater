import { TemplateType } from '.prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RenderDto, RenderResponse } from './dto/render';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
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
      expect(appController.render(data)).toBe(response);
    });
  });
});
