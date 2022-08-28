import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import EmailDtos from 'src/dtos/email.dtos';
import RepositoriesEmail from 'src/repositories/repositores-email';

@Processor('email')
@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private saveemailRespositories:RepositoriesEmail
    ) { }
  @Process('enviar-email-job')
  async sendUserConfirmation(job: Job<EmailDtos>) {
    try {
      const url = `teste`;
      const { data } = job
      console.log(data);
      
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
      if(send){
        const saveemail = await this.saveemailRespositories.salvarEmail(data);
        console.log(send);
        
        return send;
      }
      
    } catch (error) {
      console.log(error);
      
    }


  }
}
