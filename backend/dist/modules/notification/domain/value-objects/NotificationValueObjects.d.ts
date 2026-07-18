export declare class NotificationId {
    readonly value: string;
    constructor(value: string);
}
export declare class RecipientId {
    readonly value: string;
    constructor(value: string);
}
export declare class TemplateId {
    readonly value: string;
    constructor(value: string);
}
export declare enum DeliveryStatus {
    PENDING = "PENDING",
    SENT = "SENT",
    DELIVERED = "DELIVERED",
    FAILED = "FAILED"
}
export declare enum ChannelType {
    IN_APP = "IN_APP",
    EMAIL = "EMAIL",
    PUSH = "PUSH"
}
