import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "src/auth/auth.service";
import { Public } from "src/decorators/decorators";
import UserDtos from "src/dtos/user.dtos";
import { authUsers } from "src/iterfaces/auth-user.interface";
import { UsersService } from "src/users/users.service";

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
    async newUser(@Body() user:UserDtos){
      try {
        const newsuer = await this.userService.createUser(user);
        return newsuer;
      } catch (error) {
        console.log(error);
      }
    }
}