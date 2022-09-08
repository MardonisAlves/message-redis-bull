import { IsNotEmpty, IsString } from "class-validator";

export default class UserDtos{
    
    @IsString()
    @IsNotEmpty()
    cnameuser:string;

    @IsString()
    @IsNotEmpty()
    cemailuser:string;

    @IsString()
    @IsNotEmpty()
    password:string;
}