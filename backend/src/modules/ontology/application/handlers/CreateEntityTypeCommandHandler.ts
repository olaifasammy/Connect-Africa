import { provide } from 'inversify-binding-decorators';
import { injectable } from 'inversify';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';

import { CreateEntityTypeCommand } from '../commands/CreateEntityTypeCommand';
import { EntityTypeService } from '../services/EntityTypeService';
import { EntityTypeDto } from '../dto/OntologyDtos';

@provide(CreateEntityTypeCommandHandler, true)
@injectable()
export class CreateEntityTypeCommandHandler
  implements
    ICommandHandler<
      CreateEntityTypeCommand,
      EntityTypeDto
    >
{
  constructor(
    private readonly entityTypeService: EntityTypeService,
  ) {}

  async handle(
    command: CreateEntityTypeCommand,
    userId?: string,
    ipAddress?: string,
  ): Promise<EntityTypeDto & { displayName?: string; pluralDisplayName?: string; icon?: string; color?: string; namespaceUri?: string; parentEntityId?: string; isDraft?: boolean }> {
    const entityType =
      await this.entityTypeService.createEntityType(
        command.ontologyId,
        {
          name: command.name,
          description: command.description,
          displayName: command.displayName,
          pluralDisplayName: command.pluralDisplayName,
          icon: command.icon,
          color: command.color,
          namespaceUri: command.namespaceUri,
          parentEntityId: command.parentEntityId,
          isDraft: command.isDraft,
        },
        userId,
        ipAddress,
      );

    return {
      id: entityType.id.toString(),
      name: entityType.name,
      description: entityType.description,
      displayName: entityType.displayName,
      pluralDisplayName: entityType.pluralDisplayName,
      icon: entityType.icon,
      color: entityType.color,
      namespaceUri: entityType.namespaceUri,
      parentEntityId: entityType.parentEntityId,
      isDraft: entityType.isDraft,
    };
  }
}