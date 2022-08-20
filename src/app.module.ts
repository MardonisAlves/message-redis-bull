import { BullModule, InjectQueue } from '@nestjs/bull';
import {  Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { Queue } from 'bull';
import { createBullBoard } from 'bull-board';
import ConssumerEmail from './conssumer/conssumer-email';
import { AppController } from './controller/app.controller';
import { AppService } from './services/app.service';
import {BullAdapter} from 'bull-board/bullAdapter'
import { MiddlewareBuilder } from '@nestjs/core';
@Module({
  imports: [
    ScheduleModule.forRoot()
    ,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 62388
      }
    }),
    BullModule.registerQueue({
      name: 'email'
    })
  ],
  controllers: [AppController],
  providers: [AppService, ConssumerEmail],
})
export class AppModule {
  constructor(@InjectQueue('email') private emailqueue: Queue) { }
  
  configure(conssumer: MiddlewareBuilder){
   const { router } = createBullBoard([
    new BullAdapter(this.emailqueue)
   ])
   conssumer.apply(router).forRoutes('/admin/queue')
  }

}
