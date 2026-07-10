import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { CreateEntityVersionCommand } from '@modules/entity/application/commands/CreateEntityVersionCommand';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { IEntityVersionService } from '@modules/entity/domain/services/IEntityVersionService';
import { IAuditRepository } from '@modules/audit/domain/repositories/IAuditRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EntityVersionCreatedEvent } from '@modules/entity/domain/events/EntityVersionCreatedEvent';

export class CreateEntityVersionCommandHandler implements ICommandHandler<CreateEntityVersionCommand, void> {
  constructor(
    private readonly entityRepository: IEntityRepository,
    private readonly entityVersionService: IEntityVersionService,
    private readonly auditRepository: IAuditRepository,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: CreateEntityVersionCommand): Promise<void> {
    const { entityId, userId } = command;
    const id = EntityId.create(entityId);

    const entity = await this.entityRepository.findById(id);
    if (!entity) {
      throw new Error(`Entity with ID ${entityId} not found.`);
    }

    const version = await this.entityVersionService.createVersion(entity);
    
    // Publish domain events
    await this.eventBus.publish(new EntityVersionCreatedEvent(version));

    // Audit logging
    await this.auditRepository.log({
        user: userId,
        action: 'CREATE_ENTITY_VERSION',
        resource: `entity:${entityId}:version:${version.id}`,
        status: 'SUCCESS'
    });
  }
}
