export enum TemplateType {
  JINJA = 'JINJA',
  JS_TEMPLATE_LITERALS = 'JS_TEMPLATE_LITERALS',
  EJS = 'EJS',
}

export interface template {
  body: string;
  id: string;
  type: TemplateType;
}

export interface RenderDTO {
  template: template;
  data: any;
  templateType: string;
}

export interface RenderResponse {
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
