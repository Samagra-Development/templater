import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { JsTLService } from './jstl/jstl.service';
import { TemplateService } from './template/template.service';
import { AuditService } from './audit/audit.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, JsTLService, TemplateService, AuditService],
})
export class AppModule {}
