import { Module } from '@nestjs/common';
import { RenderService } from './render.service';

@Module({
  providers: [RenderService]
})
export class RenderModule {}
