import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { AddAliasCommand } from '@modules/entity/application/commands/AddAliasCommand';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { IEntityAliasRepository } from '@modules/entity/domain/repositories/IEntityAliasRepository';
import { EntityAlias } from '@modules/entity/domain/entities/EntityAlias';
import { AliasName } from '@modules/entity/domain/value-objects/EntityValueObjects';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EntityAliasAddedEvent } from '@modules/entity/domain/events/EntityAliasAddedEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { AuditLogRequestedEvent } from '@modules/audit/domain/events/AuditLogRequestedEvent';

export class AddAliasCommandHandler implements ICommandHandler<AddAliasCommand, void> {
  constructor(
    private readonly entityRepository: IEntityRepository,
    private readonly entityAliasRepository: IEntityAliasRepository,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: AddAliasCommand): Promise<void> {
    const { entityId, alias, userId } = command;
    const id = EntityId.create(entityId);

    const entity = await this.entityRepository.findById(id);
    if (!entity) throw new Error('Entity not found.');

    const entityAlias = new EntityAlias({
      entityId: id,
      name: AliasName.create(alias),
      createdAt: new Date()
    }, new UniqueEntityId());

    await this.entityAliasRepository.save(entityAlias);
    await this.eventBus.publish(new EntityAliasAddedEvent(id, alias));

    await this.eventBus.publish(new AuditLogRequestedEvent({
      action: 'ADD_ALIAS',
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
