export class GetNotificationsQuery {
  constructor(public readonly recipientId: string) {}
}

export class GetUnreadNotificationsQuery {
  constructor(public readonly recipientId: string) {}
}

export class GetNotificationByIdQuery {
  constructor(public readonly notificationId: string) {}
}
