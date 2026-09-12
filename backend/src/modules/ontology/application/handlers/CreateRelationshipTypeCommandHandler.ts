import { provide } from 'inversify-binding-decorators';
import { injectable } from 'inversify';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';

import { CreateRelationshipTypeCommand } from '../commands/CreateRelationshipTypeCommand';
import { RelationshipTypeService } from '../services/RelationshipTypeService';
import { RelationshipTypeDto } from '../dto/OntologyDtos';

@provide(CreateRelationshipTypeCommandHandler, true)
@injectable()
export class CreateRelationshipTypeCommandHandler
  implements
    ICommandHandler<
      CreateRelationshipTypeCommand,
      RelationshipTypeDto
    >
{
  constructor(
    private readonly relationshipTypeService: RelationshipTypeService,
  ) {}

  async handle(
    command: CreateRelationshipTypeCommand,
    userId?: string,
    ipAddress?: string,
  ): Promise<RelationshipTypeDto> {
    const relationshipType =
      await this.relationshipTypeService.createRelationshipType(
        command.ontologyId,
        {
          name: command.name,
          description: command.description,
          sourceEntityTypeId:
            command.sourceEntityTypeId,
          targetEntityTypeId:
            command.targetEntityTypeId,
        },
        userId,
        ipAddress,
      );

    return {
      id: relationshipType.id.toString(),
      name: relationshipType.name,
      description: relationshipType.description,
      sourceEntityTypeId:
        relationshipType.sourceEntityTypeId.toString(),
      targetEntityTypeId:
        relationshipType.targetEntityTypeId.toString(),
    };
  }
}