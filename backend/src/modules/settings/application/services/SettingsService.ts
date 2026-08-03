import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';

export class SettingsService {
  constructor(private readonly repository: ISettingsRepository) {}

  async validateSettings(userId: string): Promise<boolean> {
    const settings = await this.repository.findById(userId);
    return !!settings;
  }
}
