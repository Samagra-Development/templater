import { Injectable } from '@nestjs/common';

@Injectable()
export class JsTLService {
  interpolate = (template, variables, fallback) => {
    const regex = /\${[^{]+}/g;
    return template.replace(regex, (match) => {
      const path = match.slice(2, -1).trim();
      return this.getObjPath(path, variables, fallback);
    });
  };

  //get the specified property or nested property of an object
  getObjPath = (path, obj, fallback = '') => {
    return path.split('.').reduce((res, key) => res[key] || fallback, obj);
  };

  render = (templateText: string, data: any, fallback: string = '') => {
    return this.interpolate(templateText, data, fallback);
  };
}
