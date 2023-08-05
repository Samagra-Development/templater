import { Module } from '@nestjs/common';
import { JinjaService } from './jinja/jinja.service';
import { JsTLService } from './jstl/jstl.service';
import { EjsService } from './ejs/ejs.service';

@Module({
  providers: [JinjaService, JsTLService, EjsService],
  exports: [JinjaService, JsTLService, EjsService],
})
export class EngineModule {}
