"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNotificationPreferenceCommand = exports.DeleteNotificationCommand = exports.MarkAsReadCommand = void 0;
class MarkAsReadCommand {
    notificationId;
    constructor(notificationId) {
        this.notificationId = notificationId;
    }
}
exports.MarkAsReadCommand = MarkAsReadCommand;
class DeleteNotificationCommand {
    notificationId;
    constructor(notificationId) {
        this.notificationId = notificationId;
    }
}
exports.DeleteNotificationCommand = DeleteNotificationCommand;
class UpdateNotificationPreferenceCommand {
    recipientId;
    channel;
    enabled;
    constructor(recipientId, channel, enabled) {
        this.recipientId = recipientId;
        this.channel = channel;
        this.enabled = enabled;
    }
}
exports.UpdateNotificationPreferenceCommand = UpdateNotificationPreferenceCommand;
//# sourceMappingURL=NotificationCommands.js.map