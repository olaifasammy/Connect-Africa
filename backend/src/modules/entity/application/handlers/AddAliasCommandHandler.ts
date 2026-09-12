import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

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
import { Audit } from '@shared/infrastructure/audit/AuditDecorator';

@provide(AddAliasCommandHandler, true)
@injectable()
export class AddAliasCommandHandler
  implements ICommandHandler<AddAliasCommand, void>
{
  constructor(
    @inject('IEntityRepository')
    private readonly entityRepository: IEntityRepository,

    @inject('IEntityAliasRepository')
    private readonly entityAliasRepository: IEntityAliasRepository,

    @inject('EventBus')
    private readonly eventBus: EventBus
  ) {}

  @Audit('ADD_ALIAS', 'ENTITY')
  async handle(
    command: AddAliasCommand,
    userId?: string,
    ipAddress?: string
  ): Promise<void> {
    const entityId = EntityId.create(command.entityId);

    const entity = await this.entityRepository.findById(entityId);

    if (!entity) {
      throw new Error(
        `Entity with ID ${command.entityId} not found.`
      );
    }

    const aliasName = AliasName.create(command.alias);

    const entityAlias = new EntityAlias(
      {
        entityId,
        name: aliasName,
        createdAt: new Date(),
      },
      new UniqueEntityId()
    );

    await this.entityAliasRepository.save(entityAlias);

    await this.eventBus.publish(
      new EntityAliasAddedEvent(
        entityId,
        aliasName.value
      )
    );
  }
}