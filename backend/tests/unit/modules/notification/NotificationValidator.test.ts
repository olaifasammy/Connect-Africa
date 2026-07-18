import { NotificationValidator } from '@modules/notification/domain/validators/NotificationValidators';
import { Notification } from '@modules/notification/domain/entities/NotificationEntities';
import { NotificationId, RecipientId, TemplateId, DeliveryStatus, ChannelType } from '@modules/notification/domain/value-objects/NotificationValueObjects';

describe('NotificationValidator', () => {
  it('should validate a notification', () => {
    const validator = new NotificationValidator();
    const notification = new Notification(
      new NotificationId('1'),
      new RecipientId('1'),
      new TemplateId('1'),
      ChannelType.IN_APP,
      DeliveryStatus.PENDING,
      new Date(),
    );
    expect(validator.validate(notification)).toBe(true);
  });
});
