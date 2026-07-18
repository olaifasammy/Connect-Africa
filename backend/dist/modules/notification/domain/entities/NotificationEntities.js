"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationPreference = exports.NotificationDelivery = exports.NotificationTemplate = exports.Notification = void 0;
class Notification {
    id;
    recipientId;
    templateId;
    channel;
    status;
    createdAt;
    constructor(id, recipientId, templateId, channel, status, createdAt) {
        this.id = id;
        this.recipientId = recipientId;
        this.templateId = templateId;
        this.channel = channel;
        this.status = status;
        this.createdAt = createdAt;
    }
}
exports.Notification = Notification;
class NotificationTemplate {
    id;
    name;
    content;
    constructor(id, name, content) {
        this.id = id;
        this.name = name;
        this.content = content;
    }
}
exports.NotificationTemplate = NotificationTemplate;
class NotificationDelivery {
    id;
    notificationId;
    channel;
    status;
    deliveredAt;
    constructor(id, notificationId, channel, status, deliveredAt) {
        this.id = id;
        this.notificationId = notificationId;
        this.channel = channel;
        this.status = status;
        this.deliveredAt = deliveredAt;
    }
}
exports.NotificationDelivery = NotificationDelivery;
class NotificationPreference {
    recipientId;
    channel;
    enabled;
    constructor(recipientId, channel, enabled) {
        this.recipientId = recipientId;
        this.channel = channel;
        this.enabled = enabled;
    }
}
exports.NotificationPreference = NotificationPreference;
//# sourceMappingURL=NotificationEntities.js.map