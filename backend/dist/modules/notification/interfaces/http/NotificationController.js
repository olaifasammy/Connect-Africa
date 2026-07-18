"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const SendNotificationCommand_1 = require("../../application/commands/SendNotificationCommand");
class NotificationController {
    async send(req, res) {
        const { recipientId, templateId, channel } = req.body;
        const command = new SendNotificationCommand_1.SendNotificationCommand(recipientId, templateId, channel);
        // Call application service
        res.status(200).json({ success: true, data: { id: '123', status: 'PENDING' } });
    }
}
exports.NotificationController = NotificationController;
//# sourceMappingURL=NotificationController.js.map