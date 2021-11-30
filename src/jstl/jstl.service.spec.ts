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

  it('should render simple string', () => {
    const templateText = 'This is ${user.name}. I love to ${user.task}';
    const data = {
      user: {
        name: 'Chakshu',
        task: 'shave yaks',
      },
    };
    expect(service.render(templateText, data)).toBe(
      'This is Chakshu. I love to shave yaks',
    );
  });

  it('should replace with fallback', () => {
    const templateText = 'This is ${user.name}. I love to ${user.task}';
    const data = {
      user: {
        name: 'Chakshu',
      },
    };
    const fallback = 'fallback';
    expect(service.render(templateText, data, fallback)).toBe(
      `This is Chakshu. I love to ${fallback}`,
    );
  });
});
