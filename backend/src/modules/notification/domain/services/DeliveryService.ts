import { Notification } from '../entities/NotificationEntities';
import { DeliveryStatus } from '../value-objects/NotificationValueObjects';

export class DeliveryService {
  async deliver(notification: Notification): Promise<void> {
    // Delivery logic
  }
}
