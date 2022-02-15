import { Test, TestingModule } from '@nestjs/testing';
import { TransformerType } from '@prisma/client';
import { LambdaService } from '../lambda/lambda.service';
import { PrismaService } from '../prisma.service';
import { TransformerService } from './transformer.service';

describe('TransformerService', () => {
  let service: TransformerService;
  let prisma: PrismaService;
  let lambdaService: LambdaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LambdaService, PrismaService, TransformerService],
    }).compile();

    service = module.get<TransformerService>(TransformerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should tranform a config with options', () => {
    const transformerConfig = {
      type: TransformerType.OPTIONS,
      meta: {
        options: [
          {
            key: 'Shaving Yaks',
            value: 'Coding',
          },
          {
            key: 'Coding',
            value: 'Shaving Yaks',
          },
        ],
      },
      sampleData: {
        name: 'Chakshu',
        task: 'Shaving Yaks',
      },
    };

    const response = {
      name: 'Chakshu',
      task: 'Coding',
    };

    // Forward
    expect(
      service.processOptions(
        transformerConfig,
        transformerConfig.sampleData,
        'data.task',
      ),
    ).toEqual(response);

    // Reverse
    expect(
      service.processOptions(transformerConfig, response, 'data.task'),
    ).toEqual(transformerConfig.sampleData);
  });

  it('should tranform a config with internal function', async () => {
    /* Assuming did:internal:1 is a lambda that has the following data in DB
    {
      "createdAt": "2022-02-14T23:19:51.780Z",
      "updatedAt": "2022-02-14T23:19:51.781Z",
      "id": 1,
      "tags": [],
      "name": "Hellow World",
      "body": "function(data) { console.log({data}); return `Hello ${data.name}!`; }",
      "user": "25bbdbf7-5286-4b85-a03c-c53d1d990a23",
      "isOpen": true,
      "isActive": true,
      "isPublic": true,
      "language": "JAVASCRIPT"
    }
    */

    const transformerConfig = {
      type: TransformerType.FUNCTION_INTERNAL,
      did: 'did:internal:1',
      sampleData: {
        name: 'Chakshu',
        task: 'Shaving Yaks',
      },
    };

    const response = {
      name: 'Chakshu',
      task: 'Hello Chakshu!',
    };

    // Forward
    const r1 = await service.processInternalFunction(
      transformerConfig,
      transformerConfig.sampleData,
      'data.task',
    );
    expect(r1).toEqual(response);

    // Reverse
    const r2 = await service.processInternalFunction(
      transformerConfig,
      response,
      'data.task',
    );
    expect(r2).toEqual(response);
  });
});
