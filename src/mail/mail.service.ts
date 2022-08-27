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
    try {
      const url = `teste`;
      const { data } = job
     const send = await this.mailerService.sendMail({
      from: 'mardonis.bezerra@gmail.com',
      to: data.email,
      subject: data.assunto,
      template: './confirmation',
      context: {
        name: 'Mardonis Alves B',
        url,
        },
      })
      /* salvar o email em uma tabela no banco */
      
      return send;
      
    } catch (error) {
      console.log(error);
      
    }


  }
}
