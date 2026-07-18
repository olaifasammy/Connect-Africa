"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendNotificationCommand = void 0;
class SendNotificationCommand {
    recipientId;
    templateId;
    channel;
    constructor(recipientId, templateId, channel) {
        this.recipientId = recipientId;
        this.templateId = templateId;
        this.channel = channel;
    }
}
exports.SendNotificationCommand = SendNotificationCommand;
//# sourceMappingURL=SendNotificationCommand.js.map