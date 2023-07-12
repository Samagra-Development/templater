import { Injectable } from '@nestjs/common';
import { Template, Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { RenderDto } from '../dto/render';

@Injectable()
export class TemplateService {
  constructor(
    private prisma: PrismaService,
    private prismaClient: PrismaClient,
  ) {}

  async getTemplate(data: RenderDto): Promise<Template> {
    return this.prisma.template.findUnique({
      where: {
        id: data.id,
      },
      include: {
        bodyI18n: true,
        transformers: {
          include: {
            transformer: true,
          },
        },
      },
    });
  }

  async templates(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TemplateWhereUniqueInput;
    where?: Prisma.TemplateWhereInput;
    orderBy?: Prisma.TemplateOrderByWithRelationInput;
  }): Promise<Template[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.template.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTemplate(data: Prisma.TemplateCreateInput): Promise<Template> {
    return this.prisma.template.create({
      data,
    });
  }

  async updateTemplate(params: {
    where: Prisma.TemplateWhereUniqueInput;
    data: Prisma.TemplateUpdateInput;
  }): Promise<Template> {
    const { where, data } = params;
    return this.prisma.template.update({
      data,
      where,
    });
  }

  async deleteTemplate(
    where: Prisma.TemplateWhereUniqueInput,
  ): Promise<Template> {
    return this.prisma.template.delete({
      where,
    });
  }

  async searchTag(queryString: string): Promise<Template[]> {
    return this.prisma.template.findMany({
      take: 200,
      where: {
        tag: {
          has: queryString,
        },
      },
    });
  }

  async searchBody(queryString: string): Promise<Template[]> {
    return this.prisma.template.findMany({
      take: 200,
      include: {
        bodyI18n: true,
      },
      where: {
        OR: [
          {
            body: {
              contains: queryString,
              mode: 'insensitive',
            },
          },
          {
            bodyI18n: {
              some: {
                body: {
                  contains: queryString,
                  mode: 'insensitive',
                },
              },
            },
          },
        ],
      },
    });
  }
}
