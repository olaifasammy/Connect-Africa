import { Settings } from '../entities/Settings';
export declare class SettingsOwnershipPolicy {
    static isOwner(settings: Settings, userId: string): boolean;
}
