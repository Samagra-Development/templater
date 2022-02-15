import { Test, TestingModule } from '@nestjs/testing';
import { JinjaService } from './jinja.service';

describe('JinjaService', () => {
  let service: JinjaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JinjaService],
    }).compile();

    service = module.get<JinjaService>(JinjaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should render simple string', () => {
    const templateText = '{{ foo or title }}';
    const data = {
      foo: 'foo',
    };
    expect(service.render(templateText, data)).toBe('foo');
    const data2 = {
      title: 'title',
    };
    expect(service.render(templateText, data2)).toBe('title');
  });
});
