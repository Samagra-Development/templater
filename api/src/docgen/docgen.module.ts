import { Module } from '@nestjs/common';
import { DocgenService } from './docgen.service';

@Module({
  providers: [DocgenService]
})
export class DocgenModule {}
