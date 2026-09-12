import { inject } from 'inversify';
import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';

@provide(SettingsService, true)
@injectable()
export class SettingsService {
  constructor(
    @inject('ISettingsRepository') private readonly repository: ISettingsRepository
  ) {}

  async validateSettings(userId: string): Promise<boolean> {
    const settings = await this.repository.findById(userId);
    return !!settings;
  }
}
