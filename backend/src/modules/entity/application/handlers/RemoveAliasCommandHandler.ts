import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { RemoveAliasCommand } from '@modules/entity/application/commands/RemoveAliasCommand';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { IEntityAliasRepository } from '@modules/entity/domain/repositories/IEntityAliasRepository';
import { AliasName } from '@modules/entity/domain/value-objects/EntityValueObjects';
import { IAuditRepository } from '@modules/audit/public';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EntityAliasRemovedEvent } from '@modules/entity/domain/events/EntityAliasRemovedEvent';
import { EntityAlias } from '@modules/entity/domain/entities/EntityAlias';
import { AuditEntry } from '@modules/audit/domain/aggregates/AuditEntry';
import { AuditActor } from '@modules/audit/domain/entities/AuditActor';
import { AuditResource } from '@modules/audit/domain/entities/AuditResource';
import { AuditMetadata } from '@modules/audit/domain/entities/AuditMetadata';
import { CorrelationId, Timestamp, UserId, ResourceId, IPAddress, UserAgent } from '@modules/audit/domain/value-objects/AuditValueObjects';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

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

    const auditEntry = AuditEntry.create({
      action: 'REMOVE_ALIAS',
      actor: AuditActor.create({
        userId: new UserId(userId),
        actorType: 'USER',
        ipAddress: new IPAddress('127.0.0.1'),
        userAgent: new UserAgent('unknown')
      }),
      resource: AuditResource.create({
        id: new ResourceId(entityId),
        type: 'ENTITY'
      }),
      metadata: [AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
      correlationId: new CorrelationId(new UniqueEntityId().toString()),
      timestamp: new Timestamp(new Date())
    });

    await this.auditRepository.log(auditEntry);
  }
}
