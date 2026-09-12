import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { Audit } from '@shared/infrastructure/audit/AuditDecorator';

import { DeleteEntityTypePropertyCommand } from '../commands/DeleteEntityTypePropertyCommand';
import { EntityTypePropertyService } from '../services/EntityTypePropertyService';

@provide(DeleteEntityTypePropertyCommandHandler, true)
@injectable()
export class DeleteEntityTypePropertyCommandHandler
  implements
    ICommandHandler<
      DeleteEntityTypePropertyCommand,
      void
    >
{
  constructor(
    private readonly entityTypePropertyService: EntityTypePropertyService,
  ) {}

  @Audit('DELETE_ENTITY_TYPE_PROPERTY', 'ENTITY_TYPE_PROPERTY')
  async handle(
    command: DeleteEntityTypePropertyCommand,
    userId?: string,
    ipAddress?: string,
  ): Promise<void> {
    await this.entityTypePropertyService.deleteProperty(
      command.id,
    );
  }
}