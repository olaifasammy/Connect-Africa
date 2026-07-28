import { DomainEvent } from '@shared/domain/DomainEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class SettingsCreatedEvent extends DomainEvent {
  constructor(public readonly aggregateId: UniqueEntityId) {
    super(aggregateId);
  }
}

export class SettingsUpdatedEvent extends DomainEvent {
  constructor(
    public readonly aggregateId: UniqueEntityId,
    public readonly setting: string,
    public readonly value: string
  ) {
    super(aggregateId);
  }
}

export class ThemeChangedEvent extends DomainEvent {
  constructor(public readonly aggregateId: UniqueEntityId, public readonly theme: string) {
    super(aggregateId);
  }
}

export class LanguageChangedEvent extends DomainEvent {
  constructor(public readonly aggregateId: UniqueEntityId, public readonly locale: string) {
    super(aggregateId);
  }
}

export class NotificationPreferenceChangedEvent extends DomainEvent {
  constructor(public readonly aggregateId: UniqueEntityId, public readonly preference: string) {
    super(aggregateId);
  }
}

export class PrivacySettingChangedEvent extends DomainEvent {
  constructor(public readonly aggregateId: UniqueEntityId, public readonly level: string) {
    super(aggregateId);
  }
}

export class SecuritySettingChangedEvent extends DomainEvent {
  constructor(public readonly aggregateId: UniqueEntityId, public readonly setting: string) {
    super(aggregateId);
  }
}
