import { Module } from '@nestjs/common';
import { VMService } from './core/lambda/vm.service';

@Module({
  imports: [],
  controllers: [],
  exports: [VMService],
  providers: [VMService],
})
export class SingletonServiceModule {
  constructor(private vmService: VMService) {}
}
