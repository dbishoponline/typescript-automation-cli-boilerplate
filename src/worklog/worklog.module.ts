import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorklogController } from './worklog.controller';
import { WorklogService } from './worklog.service';
import { Worklog, WorklogSchema } from './worklog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Worklog.name, schema: WorklogSchema }]),
  ],
  controllers: [WorklogController],
  providers: [WorklogService],
})
export class WorklogModule { }
