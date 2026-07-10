import { EventBus } from './EventBus';
export declare class BullMqEventBus implements EventBus {
    private queue;
    constructor();
    publish(event: any): Promise<void>;
    subscribe(event: any, handler: (event: any) => Promise<void>): Promise<void>;
}
