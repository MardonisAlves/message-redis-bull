import { Process, Processor } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Job } from "bull";

@Processor('email')
@Injectable()
export default class ConssumerEmail{
    @Process('enviar-email-job')
    async enviarEmail(job: Job){
        console.log(job.data);
    return await job.returnvalue
    }
}