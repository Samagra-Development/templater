import { TemplateType } from '.prisma/client';

export interface RenderDto {
  id: number;
  data: any;
  path?: string;
}

export interface RenderDtoTest {
  sampleData: any;
  body: string;
  type: TemplateType;
}

export interface RenderResponse {
  processed: string | string[];
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
