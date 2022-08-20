import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';

@Injectable()
export class AppService {
  constructor(@InjectQueue('email') private emailqueue:Queue){}
  async getHello(): Promise<Job> {
   const email =  await this.emailqueue.add('enviar-email-job', {
      'msm': 'Hello world'
    },
    {
      removeOnComplete:false,
      stackTraceLimit:100,
      delay:10 * 6000,
      
    })
    return email
  }
}
