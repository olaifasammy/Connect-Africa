import { NotificationId } from '../value-objects/NotificationValueObjects';

export class NotificationSentEvent {
  constructor(public readonly notificationId: NotificationId) {}
}

export class NotificationDeliveredEvent {
  constructor(public readonly notificationId: NotificationId) {}
}

export class NotificationReadEvent {
  constructor(public readonly notificationId: NotificationId) {}
}

export class NotificationFailedEvent {
  constructor(public readonly notificationId: NotificationId, public readonly reason: string) {}
}
