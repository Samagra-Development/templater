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
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class RPCModule {}
