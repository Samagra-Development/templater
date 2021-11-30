import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { JstlService } from './jstl/jstl.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, JstlService],
})
export class AppModule {}
