import { inject } from 'inversify';
import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { ChangeThemeCommand } from '../commands/ChangeThemeCommand';
import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';
import { Theme } from '../../domain/value-objects/SettingsValueObjects';
import { ThemeSettings } from '../../domain/entities/ThemeSettings';
import { AuditLogRequestedEvent } from '@modules/audit/public';
import { EventBus } from '@shared/infrastructure/queue/EventBus';

@provide(ChangeThemeHandler, true)
@injectable()
export class ChangeThemeHandler {
  constructor(
    @inject('ISettingsRepository') private readonly settingsRepository: ISettingsRepository,
    @inject('EventBus') private readonly eventBus: EventBus
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
    
    await this.eventBus.publish(new AuditLogRequestedEvent({
        action: 'CHANGE_THEME',
        actorId: command.userId,
        actorType: 'USER',
        ipAddress: '127.0.0.1',
        userAgent: 'unknown',
        resourceId: 'SETTINGS',
        resourceType: 'SETTINGS',
        metadata: [{ key: 'status', value: 'SUCCESS' }]
    }));
  }
}
