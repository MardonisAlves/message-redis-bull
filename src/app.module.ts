import { BullModule, InjectQueue } from '@nestjs/bull';
import {  Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { Queue } from 'bull';
import { createBullBoard } from 'bull-board';
import { AppController } from './controller/app.controller';
import {BullAdapter} from 'bull-board/bullAdapter'
import { MiddlewareBuilder } from '@nestjs/core';
import EmailService from './services/email-service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config'
import { MailModule } from './mail/mail.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    HttpModule.register({
      headers:{
        "Authorization": `Bearer ` + process.env.token,
        "Content-Type": 'application/json'
      }
    }),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.HOST,
        port: Number(process.env.PORT)
      }
    }),
    BullModule.registerQueue({
      name: 'email'
    }),
    MailModule
  ],

  controllers: [AppController],
  providers: [ 
    EmailService],
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
