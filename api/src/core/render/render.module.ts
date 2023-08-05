import { Module } from '@nestjs/common';
import { RenderService } from './render.service';
import { EngineModule } from '../../engines/engine.module';

@Module({
  imports: [EngineModule],
  providers: [RenderService],
  exports: [RenderService],
})
export class RenderModule {}
