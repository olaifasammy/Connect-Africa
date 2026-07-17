import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { AddAliasCommand } from '@modules/entity/application/commands/AddAliasCommand';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { IEntityAliasRepository } from '@modules/entity/domain/repositories/IEntityAliasRepository';
import { EntityAlias } from '@modules/entity/domain/entities/EntityAlias';
import { AliasName } from '@modules/entity/domain/value-objects/EntityValueObjects';
import { IAuditRepository } from '@modules/audit/public';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EntityAliasAddedEvent } from '@modules/entity/domain/events/EntityAliasAddedEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { AuditEntry } from '@modules/audit/domain/aggregates/AuditEntry';
import { AuditActor } from '@modules/audit/domain/entities/AuditActor';
import { AuditResource } from '@modules/audit/domain/entities/AuditResource';
import { AuditMetadata } from '@modules/audit/domain/entities/AuditMetadata';
import { CorrelationId, Timestamp, UserId, ResourceId, IPAddress, UserAgent } from '@modules/audit/domain/value-objects/AuditValueObjects';

export class AddAliasCommandHandler implements ICommandHandler<AddAliasCommand, void> {
  constructor(
    private readonly entityRepository: IEntityRepository,
    private readonly entityAliasRepository: IEntityAliasRepository,
    private readonly auditRepository: IAuditRepository,
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

    const auditEntry = AuditEntry.create({
      action: 'ADD_ALIAS',
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
