import { Body, Controller, Get, Param, Post, Query, Render, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "src/auth/auth.service";
import { Public } from "src/decorators/decorators";
import UserDtos from "src/dtos/user.dtos";
import { authUsers } from "src/interfaces/auth-user.interface";
import { UsersService } from "src/users/users.service";
import EmailService from "src/services/email-service";
import { Response , Request } from "express";
import SalvarSenha from "src/dtos/salvar-senha.dtos";
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

    @Get('/nova/senha')
    @Render('index')
    async novaSenha(
      @Query() token:string,
      @Query() email:string){
      try {
        return { 
          message: 'Olá vamos definir uma nova senha',
          token:token,
          email:email
        }
      } catch (error) {
        console.log(error);
      }
    }

    @Post('nova/salvar')
    async salvarSenha(
      @Query() token:string,
      @Body() salvarSenha:SalvarSenha,
      @Res() res:Response){ 
      try {
        if(salvarSenha.password !== salvarSenha.repetir){
          /* fazer o redirect para a rota */
          return {msgpassword : 'Password deve ser igual'}
        }
        const {email}:any = token;
        const updatesenha = await this.userService.updateSenha(email , salvarSenha);
        return updatesenha;
      } catch (error) {
        console.log(error);
      }
    }
}