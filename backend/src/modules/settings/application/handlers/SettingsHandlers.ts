import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';

import {
  UpdateSettingsCommand,
  UpdateLanguageCommand,
  UpdatePrivacyCommand,
  UpdateNotificationSettingsCommand,
  UpdateNotificationPreferenceCommand,
  UpdateSecuritySettingsCommand,
  ResetSettingsCommand,
} from '../commands/SettingsCommands';

import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';

import {
  Locale,
  Timezone,
  Theme,
  PrivacyLevel,
  NotificationPreference,
} from '../../domain/value-objects/SettingsValueObjects';

import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AuditLogRequestedEvent } from '@modules/audit/public';
import { ThemeSettings } from '../../domain/entities/ThemeSettings';


@provide(UpdateSettingsHandler, true)
@injectable()
export class UpdateSettingsHandler {
  constructor(
    @inject('ISettingsRepository')
    private readonly settingsRepository: ISettingsRepository,

    @inject('EventBus')
    private readonly eventBus: EventBus,
  ) {}

  async handle(command: UpdateSettingsCommand): Promise<void> {
    const settings =
      await this.settingsRepository.findOrCreate(command.userId);

    if (command.theme) {
      settings.updateTheme(
        ThemeSettings.create({
          theme: new Theme(command.theme),
        }),
      );
    }

    if (command.locale) {
      settings.updateLanguage(
        new Locale(command.locale),
      );
    }

    if (command.timezone) {
      settings.updateTimezone(
        new Timezone(command.timezone),
      );
    }

    await this.settingsRepository.save(settings);

    for (const event of settings.domainEvents) {
      await this.eventBus.publish(event);
    }

    settings.clearDomainEvents();

    await this.eventBus.publish(
      new AuditLogRequestedEvent({
        action: 'UPDATE_SETTINGS',
        actorId: command.userId,
        actorType: 'USER',
        ipAddress: '127.0.0.1',
        userAgent: 'unknown',
        resourceId: 'SETTINGS',
        resourceType: 'SETTINGS',
        metadata: [
          {
            key: 'status',
            value: 'SUCCESS',
          },
        ],
      }),
    );
  }
}


@provide(UpdateLanguageHandler, true)
@injectable()
export class UpdateLanguageHandler {
  constructor(
    @inject('ISettingsRepository')
    private readonly settingsRepository: ISettingsRepository,

    @inject('EventBus')
    private readonly eventBus: EventBus,
  ) {}

  async handle(command: UpdateLanguageCommand): Promise<void> {
    const settings =
      await this.settingsRepository.findOrCreate(command.userId);

    settings.updateLanguage(
      new Locale(command.locale),
    );

    await this.settingsRepository.save(settings);

    for (const event of settings.domainEvents) {
      await this.eventBus.publish(event);
    }

    settings.clearDomainEvents();

    await this.eventBus.publish(
      new AuditLogRequestedEvent({
        action: 'UPDATE_LANGUAGE',
        actorId: command.userId,
        actorType: 'USER',
        ipAddress: '127.0.0.1',
        userAgent: 'unknown',
        resourceId: 'SETTINGS',
        resourceType: 'SETTINGS',
        metadata: [
          {
            key: 'status',
            value: 'SUCCESS',
          },
        ],
      }),
    );
  }
}


@provide(UpdatePrivacyHandler, true)
@injectable()
export class UpdatePrivacyHandler {
  constructor(
    @inject('ISettingsRepository')
    private readonly settingsRepository: ISettingsRepository,

    @inject('EventBus')
    private readonly eventBus: EventBus,
  ) {}

  async handle(command: UpdatePrivacyCommand): Promise<void> {
    const settings =
      await this.settingsRepository.findOrCreate(command.userId);

    settings.privacySettings.updateLevel(
      new PrivacyLevel(command.level),
    );

    await this.settingsRepository.save(settings);

    for (const event of settings.domainEvents) {
      await this.eventBus.publish(event);
    }

    settings.clearDomainEvents();

    await this.eventBus.publish(
      new AuditLogRequestedEvent({
        action: 'UPDATE_PRIVACY',
        actorId: command.userId,
        actorType: 'USER',
        ipAddress: '127.0.0.1',
        userAgent: 'unknown',
        resourceId: 'SETTINGS',
        resourceType: 'SETTINGS',
        metadata: [
          {
            key: 'status',
            value: 'SUCCESS',
          },
        ],
      }),
    );
  }
}


@provide(UpdateNotificationSettingsHandler, true)
@injectable()
export class UpdateNotificationSettingsHandler {
  constructor(
    @inject('ISettingsRepository')
    private readonly settingsRepository: ISettingsRepository,

    @inject('EventBus')
    private readonly eventBus: EventBus,
  ) {}

  async handle(
    command: UpdateNotificationSettingsCommand,
  ): Promise<void> {
    const settings =
      await this.settingsRepository.findOrCreate(command.userId);

    if (command.enabled) {
      settings.notificationSettings.enable();
    } else {
      settings.notificationSettings.disable();
    }

    await this.settingsRepository.save(settings);

    for (const event of settings.domainEvents) {
      await this.eventBus.publish(event);
    }

    settings.clearDomainEvents();

    await this.eventBus.publish(
      new AuditLogRequestedEvent({
        action: 'UPDATE_NOTIFICATIONS',
        actorId: command.userId,
        actorType: 'USER',
        ipAddress: '127.0.0.1',
        userAgent: 'unknown',
        resourceId: 'SETTINGS',
        resourceType: 'SETTINGS',
        metadata: [
          {
            key: 'status',
            value: 'SUCCESS',
          },
        ],
      }),
    );
  }
}


@provide(UpdateNotificationPreferenceHandler, true)
@injectable()
export class UpdateNotificationPreferenceHandler {
  constructor(
    @inject('ISettingsRepository')
    private readonly settingsRepository: ISettingsRepository,

    @inject('EventBus')
    private readonly eventBus: EventBus,
  ) {}

  async handle(
    command: UpdateNotificationPreferenceCommand,
  ): Promise<void> {
    const settings =
      await this.settingsRepository.findOrCreate(command.userId);

    settings.updateNotificationPreference(
      new NotificationPreference(command.preference),
    );

    await this.settingsRepository.save(settings);

    for (const event of settings.domainEvents) {
      await this.eventBus.publish(event);
    }

    settings.clearDomainEvents();

    await this.eventBus.publish(
      new AuditLogRequestedEvent({
        action: 'UPDATE_NOTIFICATION_PREFERENCE',
        actorId: command.userId,
        actorType: 'USER',
        ipAddress: '127.0.0.1',
        userAgent: 'unknown',
        resourceId: 'SETTINGS',
        resourceType: 'SETTINGS',
        metadata: [
          {
            key: 'preference',
            value: command.preference,
          },
          {
            key: 'status',
            value: 'SUCCESS',
          },
        ],
      }),
    );
  }
}


@provide(UpdateSecuritySettingsHandler, true)
@injectable()
export class UpdateSecuritySettingsHandler {
  constructor(
    @inject('ISettingsRepository')
    private readonly settingsRepository: ISettingsRepository,

    @inject('EventBus')
    private readonly eventBus: EventBus,
  ) {}

  async handle(
    command: UpdateSecuritySettingsCommand,
  ): Promise<void> {
    const settings =
      await this.settingsRepository.findOrCreate(command.userId);

    if (command.mfaEnabled) {
      settings.securitySettings.enableMfa();
    } else {
      settings.securitySettings.disableMfa();
    }

    await this.settingsRepository.save(settings);

    for (const event of settings.domainEvents) {
      await this.eventBus.publish(event);
    }

    settings.clearDomainEvents();

    await this.eventBus.publish(
      new AuditLogRequestedEvent({
        action: 'UPDATE_SECURITY',
        actorId: command.userId,
        actorType: 'USER',
        ipAddress: '127.0.0.1',
        userAgent: 'unknown',
        resourceId: 'SETTINGS',
        resourceType: 'SETTINGS',
        metadata: [
          {
            key: 'status',
            value: 'SUCCESS',
          },
        ],
      }),
    );
  }
}


@provide(ResetSettingsHandler, true)
@injectable()
export class ResetSettingsHandler {
  constructor(
    @inject('ISettingsRepository')
    private readonly settingsRepository: ISettingsRepository,

    @inject('EventBus')
    private readonly eventBus: EventBus,
  ) {}

  async handle(command: ResetSettingsCommand): Promise<void> {
    const settings =
      await this.settingsRepository.findOrCreate(command.userId);

    settings.reset();

    await this.settingsRepository.save(settings);

    for (const event of settings.domainEvents) {
      await this.eventBus.publish(event);
    }

    settings.clearDomainEvents();

    await this.eventBus.publish(
      new AuditLogRequestedEvent({
        action: 'RESET_SETTINGS',
        actorId: command.userId,
        actorType: 'USER',
        ipAddress: '127.0.0.1',
        userAgent: 'unknown',
        resourceId: 'SETTINGS',
        resourceType: 'SETTINGS',
        metadata: [
          {
            key: 'status',
            value: 'SUCCESS',
          },
        ],
      }),
    );
  }
}
