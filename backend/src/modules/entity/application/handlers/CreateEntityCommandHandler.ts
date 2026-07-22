import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { CreateEntityCommand } from '@modules/entity/application/commands/CreateEntityCommand';
import { Entity } from '@modules/entity/domain/entities/Entity';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { EntityName } from '@modules/entity/domain/value-objects/EntityName';
import { EntityMetadata } from '@modules/entity/domain/value-objects/EntityMetadata';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { EntityValidator } from '@modules/entity/domain/validators/EntityValidator';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { IOntologyGraphService } from '@modules/ontology/public';
import { AuditLogRequestedEvent } from '@modules/audit/domain/events/AuditLogRequestedEvent';

export class CreateEntityCommandHandler implements ICommandHandler<CreateEntityCommand, void> {
  constructor(
    private readonly entityRepository: IEntityRepository,
    private readonly ontologyGraphService: IOntologyGraphService,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: CreateEntityCommand): Promise<void> {
    const { name, type, description, source, tags } = command.dto;

    const isValidType = await this.ontologyGraphService.validateEntityType(type);
    if (!isValidType) {
        throw new Error(`Invalid entity type: ${type}`);
    }

    const entity = Entity.create(
      EntityId.create(new UniqueEntityId().toString()),
      EntityName.create(name),
      type,
      EntityMetadata.create({ description, source, tags: tags || [] })
    );

    EntityValidator.validate(entity);

    await this.entityRepository.save(entity);
    
    // Publish domain events
    for (const event of entity.domainEvents) {
        await this.eventBus.publish(event);
    }
    entity.clearDomainEvents();

    // Decoupled audit logging
    await this.eventBus.publish(new AuditLogRequestedEvent({
      action: 'CREATE_ENTITY',
      actorId: command.userId,
      actorType: 'USER',
      ipAddress: '127.0.0.1',
      userAgent: 'unknown',
      resourceId: entity.entityId.value,
      resourceType: 'ENTITY',
      metadata: [{ key: 'status', value: 'SUCCESS' }]
    }));
  }
}
