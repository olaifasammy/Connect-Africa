import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';
import { SystemSettingsResponseDto } from '../dto/SettingsDTOs';

export class GetSystemSettingsHandler {
  constructor(private readonly repository: ISettingsRepository) {}

  async handle(): Promise<SystemSettingsResponseDto | null> {
    // ... logic
    return {
        maintenanceMode: false,
        registrationEnabled: true
    };
  }
}
