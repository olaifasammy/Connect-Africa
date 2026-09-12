import { inject } from 'inversify';
import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';
import { UserSettingsResponseDto } from '../dto/SettingsDTOs';

@provide(GetUserSettingsHandler, true)
@injectable()
export class GetUserSettingsHandler {
  constructor(
    @inject('ISettingsRepository') private readonly repository: ISettingsRepository
  ) {}

  async handle(userId: string): Promise<UserSettingsResponseDto | null> {
    // Assuming repository has method to get user settings
    const settings = await this.repository.findById(userId);
    if (!settings) return null;
    
    // ... logic
    return {
        userId: userId,
        theme: 'light',
        notificationsEnabled: true
    };
  }
}
