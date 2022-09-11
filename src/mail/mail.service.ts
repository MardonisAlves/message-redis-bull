import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Job } from 'bull';
import EmailDtos from './../dtos/email.dtos';
import RepositoriesEmail from './../repositories/repositores-email';
import { v4 as uuidv4 } from 'uuid';

@Processor('email')
@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private saveemailRespositories:RepositoriesEmail,
    private readonly jwtservice:JwtService
    ) { }

  @Process('enviar-email-job')
  async sendUserConfirmation(job: Job<EmailDtos>) {
    try {
      const { data } = job;
      console.log(data);
      
     // return data;
      /* criar um token para o envio com validade de 5 minutos */
      const token = this.jwtservice.sign({useremail:data.email , sub:uuidv4()});
      const url = `http://localhost:3000/api/v1/nova/senha/token=${token}`;
      
     // const url = 'test'
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
        return send;
      }
      
    } catch (error) {
      console.log(error);
      
    }


  }
}
