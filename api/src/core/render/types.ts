export enum TemplateType {
  JINJA = 'JINJA',
  JS_TEMPLATE_LITERALS = 'JS_TEMPLATE_LITERALS',
  EJS = 'EJS',
}

export interface TemplateDocGen {
  createdAt: Date;
  updatedAt: Date;
  id: bigint;
  type: TemplateType;
  useCase: string | null;
  body: string | null;
  meta: any | null;
  user: string;
  tag: string[];
  transformers: TransformerPathMappingDocGen[];
}

export interface TransformerDocGen {
  createdAt: Date;
  updatedAt: Date;
  id: bigint;
  type: TransformerType;
  meta: any | null;
  sampleData: any | null;
  functionDID: string | null;
  TransformerPathMapping: TransformerPathMappingDocGen[];
}

export enum TransformerType {
  OPTIONS = 'OPTIONS',
  FUNCTION_EXTERNAL = 'FUNCTION_EXTERNAL',
  FUNCTION_INTERNAL = 'FUNCTION_INTERNAL',
}

export interface TransformerPathMappingDocGen {
  id: number;
  path: string;
  transformer: TransformerDocGen;
  template: TemplateDocGen | null;
  templateId: number | null;
  transformerId: number;
}

export interface RenderDocGenDTO {
  template: TemplateDocGen;
  data: any;
  path?: string;
}

export interface RenderDocGenResponse {
  processed: string | string[];
  templateType: TemplateType;
  data: any;
  template: string;
  meta?: any;
}

export interface RenderDocGenTest {
  sampleData: any;
  body: string;
  type: TemplateType;
}

export interface SampleData {
  data: any;
  path: string;
  response: any;
}
