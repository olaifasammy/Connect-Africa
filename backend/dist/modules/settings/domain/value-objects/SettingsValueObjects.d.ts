import { ValueObject } from '../../../../shared/domain/ValueObject';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
interface ValueProps {
    value: string;
}
export declare class Theme extends ValueObject<ValueProps> {
    static readonly LIGHT = "light";
    static readonly DARK = "dark";
    constructor(value: string);
    toString(): string;
}
export declare class Timezone extends ValueObject<ValueProps> {
    constructor(value: string);
    toString(): string;
}
export declare class Locale extends ValueObject<ValueProps> {
    constructor(value: string);
    toString(): string;
}
export declare class DateFormat extends ValueObject<ValueProps> {
    constructor(value: string);
    toString(): string;
}
export declare class Currency extends ValueObject<ValueProps> {
    constructor(value: string);
    toString(): string;
}
export declare class MeasurementUnit extends ValueObject<ValueProps> {
    constructor(value: string);
    toString(): string;
}
export declare class NotificationPreference extends ValueObject<ValueProps> {
    constructor(value: string);
    toString(): string;
}
export declare class PrivacyLevel extends ValueObject<ValueProps> {
    static readonly PUBLIC = "public";
    static readonly PRIVATE = "private";
    constructor(value: string);
    toString(): string;
}
export declare class SettingsProfileId extends UniqueEntityId {
}
export {};
