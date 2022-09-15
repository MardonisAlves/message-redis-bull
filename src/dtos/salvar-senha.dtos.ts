
import { IsNotEmpty, IsString } from "class-validator";

export default class SalvarSenha{
    @IsString()
    @IsNotEmpty()
    password:string;

    @IsString()
    @IsNotEmpty()
    repetir:string;
}