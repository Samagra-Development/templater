import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { JsTLService } from 'src/engines/jstl/jstl.service';
import { TemplateService } from './core/template/template.service';
import { AuditService } from './core/audit/audit.service';
import { LambdaService } from './core/lambda/lambda.service';
import { LambdaController } from './core/lambda/lambda.controller';
import { TransformerService } from './core/transformer/transformer.service';
import { TransformerController } from './core/transformer/transformer.controller';
import { TemplateController } from './core/template/template.controller';
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
