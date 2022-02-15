import { Test, TestingModule } from '@nestjs/testing';
import { EjsService } from './ejs.service';

describe('EjsService', () => {
  let service: EjsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EjsService],
    }).compile();

    service = module.get<EjsService>(EjsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
