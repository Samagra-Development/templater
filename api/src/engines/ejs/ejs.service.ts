import { Injectable } from '@nestjs/common';
import ejs from 'ejs';

@Injectable()
export class EjsService {
  engine: ejs;
  constructor() {}

  render = (templateText: string, data: any, fallback: string = '') => {
    return this.engine.render(templateText, data);
  };
}
