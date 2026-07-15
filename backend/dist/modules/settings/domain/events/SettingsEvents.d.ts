import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class SettingsCreatedEvent extends DomainEvent {
    readonly aggregateId: UniqueEntityId;
    constructor(aggregateId: UniqueEntityId);
}
export declare class SettingsUpdatedEvent extends DomainEvent {
    readonly aggregateId: UniqueEntityId;
    readonly setting: string;
    readonly value: string;
    constructor(aggregateId: UniqueEntityId, setting: string, value: string);
}
export declare class ThemeChangedEvent extends DomainEvent {
    readonly aggregateId: UniqueEntityId;
    readonly theme: string;
    constructor(aggregateId: UniqueEntityId, theme: string);
}
export declare class LanguageChangedEvent extends DomainEvent {
    readonly aggregateId: UniqueEntityId;
    readonly locale: string;
    constructor(aggregateId: UniqueEntityId, locale: string);
}
export declare class NotificationPreferenceChangedEvent extends DomainEvent {
    readonly aggregateId: UniqueEntityId;
    readonly preference: string;
    constructor(aggregateId: UniqueEntityId, preference: string);
}
export declare class PrivacySettingChangedEvent extends DomainEvent {
    readonly aggregateId: UniqueEntityId;
    readonly level: string;
    constructor(aggregateId: UniqueEntityId, level: string);
}
export declare class SecuritySettingChangedEvent extends DomainEvent {
    readonly aggregateId: UniqueEntityId;
    readonly setting: string;
    constructor(aggregateId: UniqueEntityId, setting: string);
}
