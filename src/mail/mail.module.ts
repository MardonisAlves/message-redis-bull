import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import RepositoriesEmail from 'src/repositories/repositores-email';
import Dbservice from 'src/dbservice/db.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        auth: {
          user: process.env.USER_BLUE,
          pass: process.env.SEND_BLUE_TOKEN,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [
    MailService,
    RepositoriesEmail,
    Dbservice],
  exports: [MailService],
})
export class MailModule { }
