import { Body, Controller, Post } from '@nestjs/common';
import { RenderService } from './render.service';
import { RenderResponse, RenderTestDTO } from './types';

@Controller('render')
export class RenderController {
  constructor(private render: RenderService) {}

  @Post('/test')
  async test(@Body() data: RenderTestDTO): Promise<RenderResponse> {
    return this.render.renderTemplateTest(data);
  }
}