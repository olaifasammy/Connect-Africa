import { CreateSettingsCommand } from '../commands/SettingsCommands';
import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';
import { Settings } from '../../domain/entities/Settings';
import { Theme, Timezone, Locale, NotificationPreference, PrivacyLevel } from '../../domain/value-objects/SettingsValueObjects';
import { ThemeSettings } from '../../domain/entities/ThemeSettings';
import { NotificationSettings } from '../../domain/entities/NotificationSettings';
import { PrivacySettings } from '../../domain/entities/PrivacySettings';
import { LanguageSettings } from '../../domain/entities/LanguageSettings';
import { SecuritySettings } from '../../domain/entities/SecuritySettings';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { IAuditLogger } from '@modules/auth/public';
import { EventBus } from '@shared/infrastructure/queue/EventBus';

export class CreateSettingsHandler {
  constructor(
    private readonly settingsRepository: ISettingsRepository,
    private readonly auditLogger: IAuditLogger,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: CreateSettingsCommand): Promise<void> {
    const settings = Settings.create({
        userId: command.userId,
        themeSettings: ThemeSettings.create({ theme: new Theme(command.theme) }),
        notificationSettings: NotificationSettings.create({ enabled: true, preference: new NotificationPreference('default') }),
        privacySettings: PrivacySettings.create({ level: new PrivacyLevel('public') }),
        languageSettings: LanguageSettings.create({ locale: new Locale(command.locale), timezone: new Timezone(command.timezone) }),
        securitySettings: SecuritySettings.create({ mfaEnabled: false }),
        preferenceSettings: []
    }, new UniqueEntityId(command.userId));
    
    await this.settingsRepository.save(settings);

    for (const event of settings.domainEvents) {
      await this.eventBus.publish(event);
    }
    settings.clearDomainEvents();
    
    await this.auditLogger.log({ user: command.userId, action: 'CREATE_SETTINGS', resource: 'SETTINGS', status: 'SUCCESS' });
  }
}
