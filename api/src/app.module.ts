import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { JsTLService } from 'src/engines/jstl/jstl.service';
import { TemplateService } from './template/template.service';
import { AuditService } from './audit/audit.service';
import { LambdaService } from './lambda/lambda.service';
import { LambdaController } from './lambda/lambda.controller';
import { TransformerService } from './transformer/transformer.service';
import { TransformerController } from './transformer/transformer.controller';
import { TemplateController } from './template/template.controller';
import { JinjaService } from './engines/jinja/jinja.service';
import { EjsService } from './engines/ejs/ejs.service';

@Module({
  imports: [],
  controllers: [LambdaController, TransformerController, TemplateController],
  providers: [
    AppService,
    PrismaService,
    JsTLService,
    TemplateService,
    AuditService,
    LambdaService,
    TransformerService,
    JinjaService,
    EjsService,
  ],
})
export class AppModule {}
