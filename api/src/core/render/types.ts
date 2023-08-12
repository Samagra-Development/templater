export enum TemplateType {
  JSTL = 'JSTL',
  EJS = 'EJS',
  JINJA = 'JINJA',
}
export interface Template {
  content: string;
}

export interface RenderReq {
  template: Template;
  data: string | any;
  engineType: string;
}

export interface RenderRes {
  processed: string | string[];
  templateType: TemplateType;
  data: any;
  templateBody: string;
  meta?: any;
}

export interface RenderTestDTO {
  sampleData: any;
  body: string;
  type: TemplateType;
}
