import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import { TemplateService } from './template.service';

describe('TemplateService', () => {
  let service: TemplateService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateService, PrismaService],
    }).compile();

    service = module.get<TemplateService>(TemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
