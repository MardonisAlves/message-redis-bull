import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import RepositoriesEmail from './../repositories/repositores-email';
import Dbservice from './../dbservice/db.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import RepositoriesUesrs from 'src/repositories/repositories-users';
import UtilsUsers from 'src/utils/utils-users';

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
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn:'86400s'}
     }),
  ],
  providers: [
    RepositoriesUesrs,
    UsersService,
    AuthService,
    MailService,
    RepositoriesEmail,
    UtilsUsers,
    Dbservice],
  exports: [
    MailService, 
    AuthService, 
    UsersService,
    RepositoriesUesrs,
    UtilsUsers
  ],
})
export class MailModule { }
