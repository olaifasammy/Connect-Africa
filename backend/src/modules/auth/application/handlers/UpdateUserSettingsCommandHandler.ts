import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { UpdateUserSettingsCommand } from '../commands/UpdateUserSettingsCommand';
import { IUserSettingsRepository } from '@modules/auth/domain/repositories/IUserSettingsRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UserId } from '@modules/auth/domain/value-objects/UserId';

export class UpdateUserSettingsCommandHandler implements ICommandHandler<UpdateUserSettingsCommand, void> {
  constructor(
    private settingsRepository: IUserSettingsRepository,
    private eventBus: EventBus
  ) {}

  async handle(command: UpdateUserSettingsCommand): Promise<void> {
    try {
      const settings = await this.settingsRepository.findByUserId(UserId.create(command.userId));
      
      if (!settings) {
        throw new AuthenticationError('Settings not found');
      }

      settings.updateSettings({
        theme: command.theme,
        language: command.language,
        timeZone: command.timeZone,
        notificationPreferences: command.notificationPreferences,
        privacySettings: command.privacySettings,
        accessibilitySettings: command.accessibilitySettings
      });
      
      await this.settingsRepository.save(settings);
      
      AuditLogger.log({
        user: command.userId,
        action: 'UPDATE_SETTINGS',
        resource: 'SETTINGS',
        status: 'SUCCESS',
        ipAddress: command.ipAddress
      });
      
      // Potential event emission here
    } catch (error) {
      AuditLogger.log({
        user: command.userId,
        action: 'UPDATE_SETTINGS',
        resource: 'SETTINGS',
        status: 'FAILURE',
        ipAddress: command.ipAddress
      });
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to update settings');
    }
  }
}
