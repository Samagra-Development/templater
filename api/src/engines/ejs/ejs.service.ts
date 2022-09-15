import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ejs = require('ejs');

@Injectable()
export class EjsService {
  engine: any = ejs;
  render = (templateText: string, data: any, fallback: string = '') => {
    return this.engine.render(templateText, data);
  };
}
