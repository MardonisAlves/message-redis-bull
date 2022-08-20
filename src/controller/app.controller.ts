import { Controller, Get, Post } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApiTags } from '@nestjs/swagger';
import { Job } from 'bull';
import { AppService } from '../services/app.service';

@ApiTags('api/v1')
@Controller('api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Post('/enviar/email')
  @Cron(CronExpression.EVERY_30_SECONDS)
  async getHello(): Promise<Job> {
    return await this.appService.getHello();
  }
}
