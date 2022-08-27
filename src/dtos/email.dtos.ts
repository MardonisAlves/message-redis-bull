import { ApiProperty } from "@nestjs/swagger";

export default class EmailDtos{

    @ApiProperty({
        example:''
    })
    email:string;

    @ApiProperty({
        example:''
    })
    assunto:string;
}