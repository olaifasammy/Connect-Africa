import { inject } from 'inversify';
import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';
import { SystemSettingsResponseDto } from '../dto/SettingsDTOs';

@provide(GetSystemSettingsHandler, true)
@injectable()
export class GetSystemSettingsHandler {
  constructor(
    @inject('ISettingsRepository') private readonly repository: ISettingsRepository
  ) {}

  async handle(): Promise<SystemSettingsResponseDto | null> {
    // ... logic
    return {
        maintenanceMode: false,
        registrationEnabled: true
    };
  }
}
