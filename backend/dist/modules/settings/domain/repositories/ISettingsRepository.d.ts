import { Settings } from '../entities/Settings';
export interface ISettingsRepository {
    findById(userId: string): Promise<Settings | null>;
    save(settings: Settings): Promise<void>;
}
