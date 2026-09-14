import { Settings } from '../entities/Settings';

export interface ISettingsRepository {
  findById(userId: string): Promise<Settings | null>;
  findOrCreate(userId: string): Promise<Settings>;
  save(settings: Settings): Promise<void>;
}
