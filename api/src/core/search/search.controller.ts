/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { Template } from '@prisma/client';
import { EjsService } from 'src/engines/ejs/ejs.service';
import { JinjaService } from 'src/engines/jinja/jinja.service';
import { JsTLService } from 'src/engines/jstl/jstl.service';
import { PrismaService } from 'src/prisma.service';
import { TemplateService } from '../template/template.service';
import { TransformerService } from '../transformer/transformer.service';

@Controller('search')
export class SearchController {
    constructor(
        private readonly jinjaService: JinjaService,
        private readonly ejsService: EjsService,
        private readonly prisma: PrismaService,
        private readonly transformerService: TransformerService,
        private readonly templateService: TemplateService,
        private readonly jstlService: JsTLService,
    ){}

    @Get('tag')
    async searchTag(@Query() queryString: string): Promise<Template[]>{
        return this.templateService.searchTag(queryString);
    }

    @Get('body')
    async searchTemplateBody(@Query() queryString: string): Promise<Template[]>{
        return this.templateService.searchBody(queryString);
    }
}
