export class NotificationId {
  constructor(public readonly value: string) {}
}

export class RecipientId {
  constructor(public readonly value: string) {}
}

export class TemplateId {
  constructor(public readonly value: string) {}
}

export enum NotificationType {
  SYSTEM = 'SYSTEM',
  KNOWLEDGE_UPDATE = 'KNOWLEDGE_UPDATE',
  ARTICLE_PUBLISHED = 'ARTICLE_PUBLISHED',
  SECURITY = 'SECURITY',
}

export enum DeliveryStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
}

export enum ChannelType {
  IN_APP = 'IN_APP',
  EMAIL = 'EMAIL',
  PUSH = 'PUSH',
}
