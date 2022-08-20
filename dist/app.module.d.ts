import { Queue } from 'bull';
import { MiddlewareBuilder } from '@nestjs/core';
export declare class AppModule {
    private emailqueue;
    constructor(emailqueue: Queue);
    configure(conssumer: MiddlewareBuilder): void;
}
