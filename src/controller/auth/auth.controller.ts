import { Body, Controller, Get, Param, Post, Query, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "src/auth/auth.service";
import { Public } from "src/decorators/decorators";
import UserDtos from "src/dtos/user.dtos";
import { authUsers } from "src/interfaces/auth-user.interface";
import { UsersService } from "src/users/users.service";
import { Response } from "express";
import EmailService from "src/services/email-service";

@ApiTags('AuthController')
@Controller('api/v1')
export default class AuthController{
    constructor(
      private readonly authService:AuthService,
      private readonly userService:UsersService,
      private readonly emailService:EmailService
      ) {}

    @Public()
    @Post('auth/login')
    async login(@Body() authUser:authUsers){
      try {
        return this.authService.login(authUser)
      } catch (error) {
        console.log(error);
      }
    }

    @Post('new/user')
    async newUser(@Body() user:UserDtos, @Res() response:Response){
      try {
        const newsuer = await this.userService.createUser(user);
        return response.json(newsuer);
      } catch (error) {
        console.log(error);
      }
    }


    @Get('/recuperar/senha/:email')
    async recuperarSenha(@Param('email') email:string){
      try {
      const recuperarSenha =  await this.userService.recuperarSenha(email);
      const sendemail = {
         email:recuperarSenha.CEMAILUSER,
         assunto:'Recuperar senha' 
      }
      await this.emailService.enviarEmail(sendemail)
      } catch (error) {
        console.log(error);
      }
    }
    //@Public()
    @Get('/nova/senha/:token')
    async novaSenha(@Param('token') token:string){
      try {
        console.log(token);
      } catch (error) {
        console.log(error);
      }
    }
}