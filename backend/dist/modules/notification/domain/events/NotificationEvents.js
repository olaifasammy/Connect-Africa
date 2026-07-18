"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationFailedEvent = exports.NotificationReadEvent = exports.NotificationDeliveredEvent = exports.NotificationSentEvent = void 0;
class NotificationSentEvent {
    notificationId;
    constructor(notificationId) {
        this.notificationId = notificationId;
    }
}
exports.NotificationSentEvent = NotificationSentEvent;
class NotificationDeliveredEvent {
    notificationId;
    constructor(notificationId) {
        this.notificationId = notificationId;
    }
}
exports.NotificationDeliveredEvent = NotificationDeliveredEvent;
class NotificationReadEvent {
    notificationId;
    constructor(notificationId) {
        this.notificationId = notificationId;
    }
}
exports.NotificationReadEvent = NotificationReadEvent;
class NotificationFailedEvent {
    notificationId;
    reason;
    constructor(notificationId, reason) {
        this.notificationId = notificationId;
        this.reason = reason;
    }
}
exports.NotificationFailedEvent = NotificationFailedEvent;
//# sourceMappingURL=NotificationEvents.js.map