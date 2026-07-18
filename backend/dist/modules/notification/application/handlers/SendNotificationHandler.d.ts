import { SendNotificationCommand } from '../commands/SendNotificationCommand';
export declare class SendNotificationHandler {
    handle(command: SendNotificationCommand): Promise<void>;
}
