import { ApiProperty } from "@nestjs/swagger";

export default class EmailDtos{

    @ApiProperty({
        example:'mardonis.bezerra@gmail.com'
    })
    email:string;

    @ApiProperty({
        example:'Teste de envio'
    })
    assunto:string;
}