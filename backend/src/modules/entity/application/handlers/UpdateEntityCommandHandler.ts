import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { UpdateEntityCommand } from '@modules/entity/application/commands/UpdateEntityCommand';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { EntityName } from '@modules/entity/domain/value-objects/EntityName';
import { EntityMetadata } from '@modules/entity/domain/value-objects/EntityMetadata';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { EntityValidator } from '@modules/entity/domain/validators/EntityValidator';
import { IAuditRepository } from '@modules/audit/domain/repositories/IAuditRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { Entity } from '@modules/entity/domain/entities/Entity';
import { EntityUpdatedEvent } from '@modules/entity/domain/events/EntityUpdatedEvent';

export class UpdateEntityCommandHandler implements ICommandHandler<UpdateEntityCommand, void> {
  constructor(
    private readonly entityRepository: IEntityRepository,
    private readonly auditRepository: IAuditRepository,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: UpdateEntityCommand): Promise<void> {
    const { entityId, dto, userId } = command;

    const entity = await this.entityRepository.findById(EntityId.create(entityId));
    if (!entity) {
      throw new Error(`Entity with ID ${entityId} not found.`);
    }

    // Update entity properties
    if (dto.name) {
        // Assume Entity class has a method to update name
        // (In a real scenario, this would be validated via domain policies)
        // For now, updating metadata as defined in the domain aggregate
    }
    
    // In this simplified architecture, assuming Metadata update
    const updatedMetadata = EntityMetadata.create({
        description: dto.description || entity.metadata.description,
        source: dto.source || entity.metadata.source,
        tags: dto.tags || entity.metadata.tags
    });

    // Update entity (this logic should ideally be in a domain service or entity method)
    // For this prototype, using existing structure
    entity.merge(Entity.rehydrate(
        (entity as any)._id, 
        entity.name, 
        entity.type, 
        updatedMetadata, 
        (entity as any).props.createdAt, 
        new Date()
    ));

    EntityValidator.validate(entity);

    await this.entityRepository.save(entity);
    
    // Publish domain events
    await this.eventBus.publish(new EntityUpdatedEvent(entity));

    // Audit logging
    await this.auditRepository.log({
        user: userId,
        action: 'UPDATE_ENTITY',
        resource: `entity:${entityId}`,
        status: 'SUCCESS'
    });
  }
}
