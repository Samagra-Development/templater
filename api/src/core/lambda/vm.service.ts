import { Injectable, OnModuleInit } from '@nestjs/common';
import { NodeVM, VM } from 'vm2';

@Injectable()
export class VMService implements OnModuleInit {
  vm: NodeVM;
  constructor() {
    console.log('VM Initialized Constructor');
    this.vm = new NodeVM({
      // console: 'redirect',
      require: {
        external: false,
      },
    });
  }
  onModuleInit() {
    console.log('VM Initialized');
  }
}
