import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { CreateRelationshipTypeCommand } from '../commands/CreateRelationshipTypeCommand';
import { RelationshipTypeService } from '../services/RelationshipTypeService';

export class CreateRelationshipTypeCommandHandler implements ICommandHandler<CreateRelationshipTypeCommand, void> {
  constructor(
    private readonly relationshipTypeService: RelationshipTypeService
  ) {}

  async handle(command: CreateRelationshipTypeCommand, userId?: string, ipAddress?: string): Promise<void> {
    await this.relationshipTypeService.createRelationshipType(
      command.ontologyId,
      { 
        name: command.name, 
        description: command.description,
        sourceEntityTypeId: command.sourceEntityTypeId,
        targetEntityTypeId: command.targetEntityTypeId
      },
      userId,
      ipAddress
    );
  }
}
