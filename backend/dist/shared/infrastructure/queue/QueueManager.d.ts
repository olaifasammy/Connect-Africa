export declare abstract class QueueManager {
    abstract publish(queue: string, message: any): Promise<void>;
    abstract subscribe(queue: string, handler: (message: any) => Promise<void>): Promise<void>;
}
