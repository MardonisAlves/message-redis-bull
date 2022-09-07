import { Body, Controller, Request, Post, UseGuards } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApiTags } from '@nestjs/swagger';
import { Job } from 'bull';
import EmailService from './../services/email-service';
import EmailDtos from './../dtos/email.dtos';
import { AuthService } from 'src/auth/auth.service';
import { authUsers } from 'src/iterfaces/auth-user.interface';
import { Public } from 'src/decorators/decorators';

@ApiTags('api/v1')
@Controller('api/v1')
export class AppController {
  constructor( 
    private readonly emailservice:EmailService,
    private readonly authService:AuthService
    ) {}
  
  @Public()
  @Post('auth/login')
  async login(@Body() authUser:authUsers){
    return this.authService.login(authUser)
  }

  @Post('/enviar/email')
  @Cron(CronExpression.EVERY_MINUTE)
  async enviarEmail(@Body() email:EmailDtos): Promise<Job | EmailDtos> {    
    return await this.emailservice.enviarEmail(email);
  }
}
