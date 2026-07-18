export declare class SendNotificationCommand {
    readonly recipientId: string;
    readonly templateId: string;
    readonly channel: string;
    constructor(recipientId: string, templateId: string, channel: string);
}
