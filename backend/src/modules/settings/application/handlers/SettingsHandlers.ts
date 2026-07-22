import { UpdateSettingsCommand, UpdateLanguageCommand, UpdatePrivacyCommand, UpdateNotificationSettingsCommand, UpdateSecuritySettingsCommand, ResetSettingsCommand } from '../commands/SettingsCommands';
import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';
import { 
  AuditEntry, 
  AuditActor, 
  AuditResource, 
  AuditMetadata, 
  CorrelationId, 
  Timestamp, 
  UserId, 
  ResourceId, 
  IPAddress, 
  UserAgent,
  IAuditRepository
} from '@modules/audit/public';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { Locale, Timezone, Theme, NotificationPreference, PrivacyLevel } from '../../domain/value-objects/SettingsValueObjects';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { SettingsNotFoundError } from '../../domain/errors/SettingsError';
import { ThemeSettings } from '../../domain/entities/ThemeSettings';

export class UpdateSettingsHandler {
  constructor(
    private readonly settingsRepository: ISettingsRepository,
    private readonly auditRepository: IAuditRepository,
    private readonly eventBus: EventBus
  ) {}
  async handle(command: UpdateSettingsCommand): Promise<void> {
    const settings = await this.settingsRepository.findById(command.userId);
    if (!settings) throw new SettingsNotFoundError(command.userId);
    
    if (command.theme) settings.updateTheme(ThemeSettings.create({ theme: new Theme(command.theme) }));
    if (command.locale) settings.updateLanguage(new Locale(command.locale));
    if (command.timezone) settings.updateTimezone(new Timezone(command.timezone));

    await this.settingsRepository.save(settings);
    
    for (const event of settings.domainEvents) {
      await this.eventBus.publish(event);
    }
    settings.clearDomainEvents();
    
    const auditEntry = AuditEntry.create({
      action: 'UPDATE_SETTINGS',
      actor: AuditActor.create({
        userId: new UserId(command.userId),
        actorType: 'USER',
        ipAddress: new IPAddress('127.0.0.1'),
        userAgent: new UserAgent('unknown')
      }),
      resource: AuditResource.create({
        id: new ResourceId('SETTINGS'),
        type: 'SETTINGS'
      }),
      metadata: [AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
      correlationId: new CorrelationId(new UniqueEntityId().toString()),
      timestamp: new Timestamp(new Date())
    });
    await this.auditRepository.log(auditEntry);
  }
}

export class UpdateLanguageHandler {
  constructor(
    private readonly settingsRepository: ISettingsRepository,
    private readonly auditRepository: IAuditRepository,
    private readonly eventBus: EventBus
  ) {}
  async handle(command: UpdateLanguageCommand): Promise<void> {
    const settings = await this.settingsRepository.findById(command.userId);
    if (!settings) throw new SettingsNotFoundError(command.userId);
    
    settings.updateLanguage(new Locale(command.locale));
    await this.settingsRepository.save(settings);
    
    for (const event of settings.domainEvents) {
      await this.eventBus.publish(event);
    }
    settings.clearDomainEvents();
    
    const auditEntry = AuditEntry.create({
      action: 'UPDATE_LANGUAGE',
      actor: AuditActor.create({
        userId: new UserId(command.userId),
        actorType: 'USER',
        ipAddress: new IPAddress('127.0.0.1'),
        userAgent: new UserAgent('unknown')
      }),
      resource: AuditResource.create({
        id: new ResourceId('SETTINGS'),
        type: 'SETTINGS'
      }),
      metadata: [AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
      correlationId: new CorrelationId(new UniqueEntityId().toString()),
      timestamp: new Timestamp(new Date())
    });
    await this.auditRepository.log(auditEntry);
  }
}

export class UpdatePrivacyHandler {
  constructor(
    private readonly settingsRepository: ISettingsRepository,
    private readonly auditRepository: IAuditRepository,
    private readonly eventBus: EventBus
  ) {}
  async handle(command: UpdatePrivacyCommand): Promise<void> {
    const settings = await this.settingsRepository.findById(command.userId);
    if (!settings) throw new SettingsNotFoundError(command.userId);
    
    settings.privacySettings.updateLevel(new PrivacyLevel(command.level));
    await this.settingsRepository.save(settings);
    
    for (const event of settings.domainEvents) {
      await this.eventBus.publish(event);
    }
    settings.clearDomainEvents();
    
    const auditEntry = AuditEntry.create({
      action: 'UPDATE_PRIVACY',
      actor: AuditActor.create({
        userId: new UserId(command.userId),
        actorType: 'USER',
        ipAddress: new IPAddress('127.0.0.1'),
        userAgent: new UserAgent('unknown')
      }),
      resource: AuditResource.create({
        id: new ResourceId('SETTINGS'),
        type: 'SETTINGS'
      }),
      metadata: [AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
      correlationId: new CorrelationId(new UniqueEntityId().toString()),
      timestamp: new Timestamp(new Date())
    });
    await this.auditRepository.log(auditEntry);
  }
}

export class UpdateNotificationSettingsHandler {
  constructor(
    private readonly settingsRepository: ISettingsRepository,
    private readonly auditRepository: IAuditRepository,
    private readonly eventBus: EventBus
  ) {}
  async handle(command: UpdateNotificationSettingsCommand): Promise<void> {
    const settings = await this.settingsRepository.findById(command.userId);
    if (!settings) throw new SettingsNotFoundError(command.userId);
    
    if (command.enabled) settings.notificationSettings.enable();
    else settings.notificationSettings.disable();
    
    await this.settingsRepository.save(settings);
    
    for (const event of settings.domainEvents) {
      await this.eventBus.publish(event);
    }
    settings.clearDomainEvents();
    
    const auditEntry = AuditEntry.create({
      action: 'UPDATE_NOTIFICATIONS',
      actor: AuditActor.create({
        userId: new UserId(command.userId),
        actorType: 'USER',
        ipAddress: new IPAddress('127.0.0.1'),
        userAgent: new UserAgent('unknown')
      }),
      resource: AuditResource.create({
        id: new ResourceId('SETTINGS'),
        type: 'SETTINGS'
      }),
      metadata: [AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
      correlationId: new CorrelationId(new UniqueEntityId().toString()),
      timestamp: new Timestamp(new Date())
    });
    await this.auditRepository.log(auditEntry);
  }
}

export class UpdateSecuritySettingsHandler {
  constructor(
    private readonly settingsRepository: ISettingsRepository,
    private readonly auditRepository: IAuditRepository,
    private readonly eventBus: EventBus
  ) {}
  async handle(command: UpdateSecuritySettingsCommand): Promise<void> {
    const settings = await this.settingsRepository.findById(command.userId);
    if (!settings) throw new SettingsNotFoundError(command.userId);
    
    if (command.mfaEnabled) settings.securitySettings.enableMfa();
    else settings.securitySettings.disableMfa();

    await this.settingsRepository.save(settings);
    
    for (const event of settings.domainEvents) {
      await this.eventBus.publish(event);
    }
    settings.clearDomainEvents();
    
    const auditEntry = AuditEntry.create({
      action: 'UPDATE_SECURITY',
      actor: AuditActor.create({
        userId: new UserId(command.userId),
        actorType: 'USER',
        ipAddress: new IPAddress('127.0.0.1'),
        userAgent: new UserAgent('unknown')
      }),
      resource: AuditResource.create({
        id: new ResourceId('SETTINGS'),
        type: 'SETTINGS'
      }),
      metadata: [AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
      correlationId: new CorrelationId(new UniqueEntityId().toString()),
      timestamp: new Timestamp(new Date())
    });
    await this.auditRepository.log(auditEntry);
  }
}

export class ResetSettingsHandler {
  constructor(
    private readonly settingsRepository: ISettingsRepository,
    private readonly auditRepository: IAuditRepository,
    private readonly eventBus: EventBus
  ) {}
  async handle(command: ResetSettingsCommand): Promise<void> {
    // ... logic for resetting to defaults
    const auditEntry = AuditEntry.create({
      action: 'RESET_SETTINGS',
      actor: AuditActor.create({
        userId: new UserId(command.userId),
        actorType: 'USER',
        ipAddress: new IPAddress('127.0.0.1'),
        userAgent: new UserAgent('unknown')
      }),
      resource: AuditResource.create({
        id: new ResourceId('SETTINGS'),
        type: 'SETTINGS'
      }),
      metadata: [AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
      correlationId: new CorrelationId(new UniqueEntityId().toString()),
      timestamp: new Timestamp(new Date())
    });
    await this.auditRepository.log(auditEntry);
  }
}
