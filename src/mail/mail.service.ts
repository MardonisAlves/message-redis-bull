import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import EmailDtos from 'src/dtos/email.dtos';

@Processor('email')
@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) { }
  @Process('enviar-email-job')
  async sendUserConfirmation(job: Job<EmailDtos>) {
    const url = `teste`;
    const {data} = job
    console.log(data);
    
    return await this.mailerService.sendMail({

     from: 'mardonis.bezerra@gmail.com',
     to: data.email, 
      subject: data.assunto,
      template: './confirmation', 
      context: { 
        name: 'Mardonis Alves B',
        url,
      },
    }).then(res => {
      console.log(res);

      return res
    }).catch(error => {
      console.log(error);
      
    });
  }
}
