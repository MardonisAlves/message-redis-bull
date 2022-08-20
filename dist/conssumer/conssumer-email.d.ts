import { Job } from "bull";
export default class ConssumerEmail {
    enviarEmail(job: Job): Promise<any>;
}
