"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NotificationValidators_1 = require("@modules/notification/domain/validators/NotificationValidators");
const NotificationEntities_1 = require("@modules/notification/domain/entities/NotificationEntities");
const NotificationValueObjects_1 = require("@modules/notification/domain/value-objects/NotificationValueObjects");
describe('NotificationValidator', () => {
    it('should validate a notification', () => {
        const validator = new NotificationValidators_1.NotificationValidator();
        const notification = new NotificationEntities_1.Notification(new NotificationValueObjects_1.NotificationId('1'), new NotificationValueObjects_1.RecipientId('1'), new NotificationValueObjects_1.TemplateId('1'), NotificationValueObjects_1.ChannelType.IN_APP, NotificationValueObjects_1.DeliveryStatus.PENDING, new Date());
        expect(validator.validate(notification)).toBe(true);
    });
});
//# sourceMappingURL=NotificationValidator.test.js.map