"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNotificationByIdQuery = exports.GetUnreadNotificationsQuery = exports.GetNotificationsQuery = void 0;
class GetNotificationsQuery {
    recipientId;
    constructor(recipientId) {
        this.recipientId = recipientId;
    }
}
exports.GetNotificationsQuery = GetNotificationsQuery;
class GetUnreadNotificationsQuery {
    recipientId;
    constructor(recipientId) {
        this.recipientId = recipientId;
    }
}
exports.GetUnreadNotificationsQuery = GetUnreadNotificationsQuery;
class GetNotificationByIdQuery {
    notificationId;
    constructor(notificationId) {
        this.notificationId = notificationId;
    }
}
exports.GetNotificationByIdQuery = GetNotificationByIdQuery;
//# sourceMappingURL=NotificationQueries.js.map