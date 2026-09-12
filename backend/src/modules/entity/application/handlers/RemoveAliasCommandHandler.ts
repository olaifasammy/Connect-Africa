import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { RemoveAliasCommand } from '@modules/entity/application/commands/RemoveAliasCommand';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { IEntityAliasRepository } from '@modules/entity/domain/repositories/IEntityAliasRepository';
import { AliasName } from '@modules/entity/domain/value-objects/EntityValueObjects';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EntityAliasRemovedEvent } from '@modules/entity/domain/events/EntityAliasRemovedEvent';
import { Audit } from '@shared/infrastructure/audit/AuditDecorator';

@provide(RemoveAliasCommandHandler, true)
@injectable()
export class RemoveAliasCommandHandler
  implements ICommandHandler<RemoveAliasCommand, void>
{
  constructor(
    @inject('IEntityAliasRepository')
    private readonly entityAliasRepository: IEntityAliasRepository,

    @inject('EventBus')
    private readonly eventBus: EventBus,
  ) {}

  @Audit('REMOVE_ALIAS', 'ENTITY')
  async handle(command: RemoveAliasCommand): Promise<void> {
    const entityId = EntityId.create(command.entityId);
    const aliasName = AliasName.create(command.alias);

    const aliases =
      await this.entityAliasRepository.findByEntityId(entityId);

    const aliasToRemove = aliases.find(
      (alias) => alias.name.value === aliasName.value,
    );

    if (!aliasToRemove) {
      throw new Error(
        `Alias "${aliasName.value}" not found for entity ${entityId.value}.`,
      );
    }

    await this.entityAliasRepository.delete(aliasToRemove);

    await this.eventBus.publish(
      new EntityAliasRemovedEvent(
        entityId,
        aliasName.value,
      ),
    );
  }
}