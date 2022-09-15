/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { Template } from '@prisma/client';
import { TemplateService } from '../template/template.service';

@Controller('search')
export class SearchController {
  constructor(private readonly templateService: TemplateService) {}

  @Get('tag')
  async searchTag(@Query() queryString: string): Promise<Template[]> {
    return this.templateService.searchTag(queryString);
  }

  @Get('body')
  async searchTemplateBody(@Query() queryString: string): Promise<Template[]> {
    console.log(queryString);
    return this.templateService.searchBody(queryString);
  }
}
