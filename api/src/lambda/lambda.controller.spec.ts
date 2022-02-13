import { Test, TestingModule } from '@nestjs/testing';
import { LambdaController } from './lambda.controller';

describe('LambdaController', () => {
  let controller: LambdaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LambdaController],
    }).compile();

    controller = module.get<LambdaController>(LambdaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
