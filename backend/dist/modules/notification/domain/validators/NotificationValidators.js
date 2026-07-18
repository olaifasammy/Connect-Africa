"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateValidator = exports.NotificationValidator = void 0;
class NotificationValidator {
    validate(notification) {
        return !!notification.id && !!notification.recipientId;
    }
}
exports.NotificationValidator = NotificationValidator;
class TemplateValidator {
    validate(template) {
        return !!template.id && !!template.content;
    }
}
exports.TemplateValidator = TemplateValidator;
//# sourceMappingURL=NotificationValidators.js.map