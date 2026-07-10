import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { RemoveAliasCommand } from '@modules/entity/application/commands/RemoveAliasCommand';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { IEntityAliasRepository } from '@modules/entity/domain/repositories/IEntityAliasRepository';
import { AliasName } from '@modules/entity/domain/value-objects/EntityValueObjects';
import { IAuditRepository } from '@modules/audit/domain/repositories/IAuditRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EntityAliasRemovedEvent } from '@modules/entity/domain/events/EntityAliasRemovedEvent';
import { EntityAlias } from '@modules/entity/domain/entities/EntityAlias';

export class RemoveAliasCommandHandler implements ICommandHandler<RemoveAliasCommand, void> {
  constructor(
    private readonly entityAliasRepository: IEntityAliasRepository,
    private readonly auditRepository: IAuditRepository,
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

    await this.auditRepository.log({
      user: userId,
      action: 'REMOVE_ALIAS',
      resource: `entity:${entityId}`,
      status: 'SUCCESS'
    });
  }
}
