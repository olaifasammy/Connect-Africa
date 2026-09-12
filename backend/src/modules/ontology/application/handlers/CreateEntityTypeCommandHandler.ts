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
  ): Promise<EntityTypeDto> {
    const entityType =
      await this.entityTypeService.createEntityType(
        command.ontologyId,
        {
          name: command.name,
          description: command.description,
        },
        userId,
        ipAddress,
      );

    return {
      id: entityType.id.toString(),
      name: entityType.name,
      description: entityType.description,
    };
  }
}