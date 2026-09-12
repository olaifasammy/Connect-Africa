import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Notification } from '../entities/NotificationEntities';
import { DeliveryStatus } from '../value-objects/NotificationValueObjects';

@provide(DeliveryService, true)
@injectable()
export class DeliveryService {
  async deliver(notification: Notification): Promise<void> {
    // Delivery logic
  }
}
