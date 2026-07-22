import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { RemoveAliasCommand } from '@modules/entity/application/commands/RemoveAliasCommand';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { IEntityAliasRepository } from '@modules/entity/domain/repositories/IEntityAliasRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EntityAliasRemovedEvent } from '@modules/entity/domain/events/EntityAliasRemovedEvent';
import { AuditLogRequestedEvent } from '@modules/audit/domain/events/AuditLogRequestedEvent';

export class RemoveAliasCommandHandler implements ICommandHandler<RemoveAliasCommand, void> {
  constructor(
    private readonly entityAliasRepository: IEntityAliasRepository,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: RemoveAliasCommand): Promise<void> {
    const { entityId, alias, userId } = command;
    const id = EntityId.create(entityId);

    // Assuming we need to find the alias object first
    const aliases = await this.entityAliasRepository.findByEntityId(id);
    const aliasToRemove = aliases.find(a => a.name.value === alias);
    
    if (!aliasToRemove) {
      throw new Error('Alias not found.');
    }

    await this.entityAliasRepository.delete(aliasToRemove);
    await this.eventBus.publish(new EntityAliasRemovedEvent(id, alias));

    // Decoupled audit logging
    await this.eventBus.publish(new AuditLogRequestedEvent({
      action: 'REMOVE_ALIAS',
      actorId: userId,
      actorType: 'USER',
      ipAddress: '127.0.0.1',
      userAgent: 'unknown',
      resourceId: entityId,
      resourceType: 'ENTITY',
      metadata: [{ key: 'status', value: 'SUCCESS' }]
    }));
  }
}
