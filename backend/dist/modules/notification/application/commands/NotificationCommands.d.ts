export declare class MarkAsReadCommand {
    readonly notificationId: string;
    constructor(notificationId: string);
}
export declare class DeleteNotificationCommand {
    readonly notificationId: string;
    constructor(notificationId: string);
}
export declare class UpdateNotificationPreferenceCommand {
    readonly recipientId: string;
    readonly channel: string;
    readonly enabled: boolean;
    constructor(recipientId: string, channel: string, enabled: boolean);
}
