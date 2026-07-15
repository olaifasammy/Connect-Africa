import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class Theme extends UniqueEntityId {
    static readonly LIGHT = "light";
    static readonly DARK = "dark";
    constructor(value: string);
}
export declare class Timezone extends UniqueEntityId {
}
export declare class Locale extends UniqueEntityId {
}
export declare class DateFormat extends UniqueEntityId {
}
export declare class Currency extends UniqueEntityId {
}
export declare class MeasurementUnit extends UniqueEntityId {
}
export declare class NotificationPreference extends UniqueEntityId {
}
export declare class PrivacyLevel extends UniqueEntityId {
}
