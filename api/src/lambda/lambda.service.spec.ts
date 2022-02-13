import { Test, TestingModule } from '@nestjs/testing';
import { LambdaService } from './lambda.service';
import { Lambda, Language } from '@prisma/client';

describe('LambdaService', () => {
  let service: LambdaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LambdaService],
    }).compile();

    service = module.get<LambdaService>(LambdaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should run a simple javascript lambda', () => {
    const lambda: Lambda = {
      body: 'function(data) { console.log({data}); return `Hello ${data.name}!`; }',
      name: 'test',
      createdAt: new Date(),
      updatedAt: new Date(),
      id: BigInt(1),
      tags: [],
      isOpen: true,
      isActive: true,
      isPublic: true,
      user: 'test',
      language: Language.JAVASCRIPT,
    };
    const testData = {
      name: 'Chakshu',
      task: 'shave yaks',
    };
    const result = service.process(lambda, testData);
    expect(result.response).toEqual('Hello Chakshu!');
    // Expected Output:
    // {
    //   statusCode: 1,
    //   statusMessage: 'OK',
    //   error: null,
    //   response: 'Hello Chakshu!',
    //   consoleOutput: [ '{"data":{"name":"Chakshu","task":"shave yaks"}}' ],
    //   executionTimeInMs: 2.9208755493164062
    // }
  });

  it('should run a simple typescript lambda', () => {
    const lambda: Lambda = {
      body: 'function(data: any) { console.log({data}); return `Hello ${data.name}!`; }',
      name: 'test',
      createdAt: new Date(),
      updatedAt: new Date(),
      id: BigInt(1),
      tags: [],
      isOpen: true,
      isActive: true,
      isPublic: true,
      user: 'test',
      language: Language.TYPESCRIPT,
    };
    const testData = {
      name: 'Chakshu',
      task: 'shave yaks',
    };
    const result = service.process(lambda, testData);
    expect(result.response).toEqual('Hello Chakshu!');
    // Expected Output:
    // {
    //   statusCode: 1,
    //   statusMessage: 'OK',
    //   error: null,
    //   response: 'Hello Chakshu!',
    //   consoleOutput: [ '{"data":{"name":"Chakshu","task":"shave yaks"}}' ],
    //   executionTimeInMs: 2.9208755493164062
    // }
  });

  it('should error on invalid lambda', () => {
    const lambda: Lambda = {
      body: 'func(data: any) { console.log({data}); return `Hello ${data.name}!`; }',
      name: 'test',
      createdAt: new Date(),
      updatedAt: new Date(),
      id: BigInt(1),
      tags: [],
      isOpen: true,
      isActive: true,
      isPublic: true,
      user: 'test',
      language: Language.TYPESCRIPT,
    };
    const testData = {
      name: 'Chakshu',
      task: 'shave yaks',
    };
    const result = service.process(lambda, testData);
    expect(result.response).toEqual(null);
    expect(result.statusCode).toEqual(3);
    expect(result.statusMessage).toEqual(
      'ERROR: The function signature is not valid. It should be function(data)',
    );
  });
});
