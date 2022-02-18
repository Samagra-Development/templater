import { TemplateType } from '.prisma/client';

export interface RenderDto {
  id: number;
  data: any;
  path?: string;
}

export interface RenderResponse {
  processed: string;
  templateType: TemplateType;
  data: any;
  template: string;
  meta?: any;
}

export interface SampleData {
  data: any;
  path: string;
  response: any;
}
