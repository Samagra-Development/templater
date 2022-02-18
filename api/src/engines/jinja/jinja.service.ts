import { Injectable } from '@nestjs/common';

@Injectable()
export class JinjaService {
  nunjucks: any;

  constructor() {
    this.nunjucks = require('nunjucks');
    this.nunjucks.configure({ autoescape: true });
  }

  render = (templateText: string, data: any, fallback: string = '') => {
    return this.nunjucks.renderString(templateText, data);
  };

  validate = (templateText: string): boolean => {
    return this.nunjucks.renderString(templateText, {});
  };
}
