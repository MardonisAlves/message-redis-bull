import { Job, Queue } from 'bull';
export declare class AppService {
    private emailqueue;
    constructor(emailqueue: Queue);
    getHello(): Promise<Job>;
}
