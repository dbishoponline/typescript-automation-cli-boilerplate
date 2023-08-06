import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorklogModule } from './worklog/worklog.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/time_log', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    }),
    WorklogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }