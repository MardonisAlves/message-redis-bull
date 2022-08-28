import { Body, Controller, Get, Post } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApiTags } from '@nestjs/swagger';
import { Job } from 'bull';
import EmailService from 'src/services/email-service';
import { HttpService } from "@nestjs/axios";
import EmailDtos from 'src/dtos/email.dtos';

@ApiTags('api/v1')
@Controller('api/v1')
export class AppController {
  constructor( private readonly emailservice:EmailService) {}


  @Post('/enviar/email')
  @Cron(CronExpression.EVERY_MINUTE)
  async enviarEmail(@Body() email:EmailDtos): Promise<Job | EmailDtos> {    
    return await this.emailservice.enviarEmail(email);
  }
}
