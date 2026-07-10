import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { CreateEntityCommand } from '@modules/entity/application/commands/CreateEntityCommand';
import { Entity } from '@modules/entity/domain/entities/Entity';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { EntityName } from '@modules/entity/domain/value-objects/EntityName';
import { EntityMetadata } from '@modules/entity/domain/value-objects/EntityMetadata';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { EntityValidator } from '@modules/entity/domain/validators/EntityValidator';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { IAuditRepository } from '@modules/audit/domain/repositories/IAuditRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';

export class CreateEntityCommandHandler implements ICommandHandler<CreateEntityCommand, void> {
  constructor(
    private readonly entityRepository: IEntityRepository,
    private readonly auditRepository: IAuditRepository,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: CreateEntityCommand): Promise<void> {
    const { name, type, description, source, tags } = command.dto;

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

    // Audit logging
    await this.auditRepository.log({
        user: command.userId,
        action: 'CREATE_ENTITY',
        resource: `entity:${entity.entityId.value}`,
        status: 'SUCCESS'
    });
  }
}
