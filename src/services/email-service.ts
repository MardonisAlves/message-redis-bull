import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Job, Queue } from "bull";
import EmailDtos from "./../dtos/email.dtos";
@Injectable()
export default class EmailService{
    constructor(
        @InjectQueue('email') private emailqueue:Queue) {}
    async enviarEmail(emailDto:EmailDtos):Promise<Job | EmailDtos>{
        try {
        if(!emailDto){
            return emailDto
        }
        const email = await this.emailqueue.add('enviar-email-job',emailDto,{
            removeOnFail:true,
            stackTraceLimit:2
        });
        return email;
        } catch (error) {
         console.log(error);  
        }
    }
}