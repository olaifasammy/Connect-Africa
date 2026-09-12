import { Notification, NotificationDelivery } from '../entities/NotificationEntities';

export class NotificationAggregate {
  constructor(
    public readonly notification: Notification,
    public readonly deliveries: NotificationDelivery[],
  ) {}
}
