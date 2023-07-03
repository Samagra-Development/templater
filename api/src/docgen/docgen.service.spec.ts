import { Test, TestingModule } from '@nestjs/testing';
import { DocgenService } from './docgen.service';

describe('DocgenService', () => {
  let service: DocgenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocgenService],
    }).compile();

    service = module.get<DocgenService>(DocgenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
