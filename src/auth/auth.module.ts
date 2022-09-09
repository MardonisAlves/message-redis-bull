import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './guards/jwt.strategy';
import { Localtrategy } from './strategies/local.strategy';
import { APP_GUARD  } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import UtilsUsers from 'src/utils/utils-users';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn:'86400s'}
     })
    ],
  providers: [
    AuthService, 
    Localtrategy, 
    JwtStrategy,
    {
      provide:APP_GUARD,
      useClass:JwtAuthGuard
    },
  ],
  exports: [AuthService]
})
export class AuthModule {}
