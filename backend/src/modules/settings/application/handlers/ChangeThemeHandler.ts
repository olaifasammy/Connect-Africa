import { ChangeThemeCommand } from '../commands/ChangeThemeCommand';
import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';
import { Theme } from '../../domain/value-objects/SettingsValueObjects';
import { ThemeSettings } from '../../domain/entities/ThemeSettings';
import { IAuditLogger } from '@modules/auth/public';
import { EventBus } from '@shared/infrastructure/queue/EventBus';

export class ChangeThemeHandler {
  constructor(
    private readonly settingsRepository: ISettingsRepository,
    private readonly auditLogger: IAuditLogger,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: ChangeThemeCommand): Promise<void> {
    const settings = await this.settingsRepository.findById(command.userId);
    if (!settings) throw new Error('Settings not found');
    
    settings.updateTheme(ThemeSettings.create({ theme: new Theme(command.theme) }));
    await this.settingsRepository.save(settings);
    
    for (const event of settings.domainEvents) {
      await this.eventBus.publish(event);
    }
    settings.clearDomainEvents();
    
    await this.auditLogger.log({ user: command.userId, action: 'CHANGE_THEME', resource: 'SETTINGS', status: 'SUCCESS' });
  }
}
