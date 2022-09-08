import { Body, Controller, Post } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApiTags } from '@nestjs/swagger';
import { Job } from 'bull';
import EmailService from './../services/email-service';
import EmailDtos from './../dtos/email.dtos';

@ApiTags('AppController')
@Controller('api/v1')
export class AppController {
  constructor(private readonly emailservice:EmailService) {}
  
  @Post('/enviar/email')
  @Cron(CronExpression.EVERY_MINUTE)
  async enviarEmail(@Body() email:EmailDtos): Promise<Job | EmailDtos> {    
    return await this.emailservice.enviarEmail(email);
  }
}
