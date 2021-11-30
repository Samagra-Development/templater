import { Test, TestingModule } from '@nestjs/testing';

import { JsTLService } from './jstl.service';

describe('JsTLService', () => {
  let service: JsTLService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsTLService],
    }).compile();

    service = module.get<JsTLService>(JsTLService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
