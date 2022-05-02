import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { v4 as uuid } from 'uuid';

@Controller()
export class AppController {
  @GrpcMethod('StudentController', 'GetStudent')
  getStudent(data: any): any {
    return 1;
  }
}
