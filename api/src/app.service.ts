import { Prisma, Template } from '@prisma/client';

import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getAllTemplates(): Promise<Template[]> {
    return this.prisma.template.findMany();
  }

  async createTemplate(data: Prisma.TemplateCreateInput): Promise<Template> {
    return this.prisma.template.create({
      data,
    });
  }
}
