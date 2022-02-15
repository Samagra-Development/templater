import { Injectable } from '@nestjs/common';
import { Lambda, Transformer } from '@prisma/client';
import { TransformerType } from '@prisma/client';
import { LambdaService } from '../lambda/lambda.service';

@Injectable()
export class TransformerService {
  constructor(private lambdaService: LambdaService) {}

  async process(
    transformer: Transformer,
    data: any,
    path: string,
  ): Promise<any> {
    if (transformer.type === TransformerType.OPTIONS) {
      return this.processOptions(transformer, data, path);
    } else if (transformer.type === TransformerType.FUNCTION_INTERNAL) {
      return this.processInternalFunction(transformer, data, path);
    } else if (transformer.type === TransformerType.FUNCTION_EXTERNAL) {
      return data;
    }
  }

  processOptions(
    transformerConfig: {
      type: TransformerType;
      meta?: any; // TODO: fix this to accomoactual type: { options: { key: string; value: string }[] };
      sampleData?: any;
    },
    data: any,
    path: string,
  ): any {
    // Replace the field at the path with the value from the options else return the original value
    const clonedData = JSON.parse(JSON.stringify(data));
    const field = path.split('.').pop();
    const options = transformerConfig.meta.options;
    const option = options.find((o) => o.key === clonedData[field]);
    if (option) {
      clonedData[field] = option.value;
    }
    return clonedData;
  }

  async processInternalFunction(
    transformerConfig: {
      type: TransformerType;
      functionDID?: string;
      sampleData?: any;
    },
    data: any,
    path: string,
  ): Promise<any> {
    const clonedData = JSON.parse(JSON.stringify(data));
    // get lambda by id from the did and run it
    const lambda = await this.lambdaService.getLambdaFromDID(
      transformerConfig.functionDID,
    );
    if (lambda) {
      const result = await this.lambdaService.process(lambda, clonedData);
      if (result.statusCode === 1) {
        const field = path.split('.').pop();
        clonedData[field] = result.response;
      }
      return clonedData;
    } else {
      throw new Error('Lambda not found');
    }
  }
}
