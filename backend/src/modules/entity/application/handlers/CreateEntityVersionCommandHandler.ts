import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';

import { CreateEntityVersionCommand } from '@modules/entity/application/commands/CreateEntityVersionCommand';

import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { IEntityVersionService } from '@modules/entity/domain/services/IEntityVersionService';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';

import { EventBus } from '@shared/infrastructure/queue/EventBus';

import { Audit } from '@shared/infrastructure/audit/AuditDecorator';

@provide(CreateEntityVersionCommandHandler, true)
@injectable()
export class CreateEntityVersionCommandHandler
  implements ICommandHandler<CreateEntityVersionCommand, void>
{
  constructor(
    @inject('IEntityRepository')
    private readonly entityRepository: IEntityRepository,

    @inject('IEntityVersionService')
    private readonly entityVersionService: IEntityVersionService,

    @inject('EventBus')
    private readonly eventBus: EventBus,
  ) {}

  @Audit('CREATE_ENTITY_VERSION', 'ENTITY')
  async handle(
    command: CreateEntityVersionCommand,
    userId?: string,
    ipAddress?: string,
  ): Promise<void> {
    const entityId = EntityId.create(command.entityId);

    const entity =
      await this.entityRepository.findById(entityId);

    if (!entity) {
      throw new Error(
        `Entity with ID ${command.entityId} not found.`,
      );
    }

    const version =
      await this.entityVersionService.createVersion(
        entity,
      );

    await this.eventBus.publish(version);
  }
}