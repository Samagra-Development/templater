import { Test, TestingModule } from '@nestjs/testing';
import { TransformerController } from './transformer.controller';

describe('TransformerController', () => {
  let controller: TransformerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransformerController],
    }).compile();

    controller = module.get<TransformerController>(TransformerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
