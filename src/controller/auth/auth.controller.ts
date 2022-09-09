import { Body, Controller, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "src/auth/auth.service";
import { Public } from "src/decorators/decorators";
import UserDtos from "src/dtos/user.dtos";
import { authUsers } from "src/interfaces/auth-user.interface";
import { UsersService } from "src/users/users.service";
import { Response } from "express";

@ApiTags('AuthController')
@Controller('api/v1')
export default class AuthController{
    constructor(
      private readonly authService:AuthService,
      private readonly userService:UsersService
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
}