import { TemplateType } from '.prisma/client';

export interface RenderDto {
  id: number;
  data: any;
}

export interface RenderResponse {
  processed: string;
  templateType: TemplateType;
  data: any;
  template: string;
}
