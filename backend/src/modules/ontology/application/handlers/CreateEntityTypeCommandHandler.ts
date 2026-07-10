import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { CreateEntityTypeCommand } from '../commands/CreateEntityTypeCommand';
import { EntityTypeService } from '../services/EntityTypeService';

export class CreateEntityTypeCommandHandler implements ICommandHandler<CreateEntityTypeCommand, void> {
  constructor(
    private readonly entityTypeService: EntityTypeService
  ) {}

  async handle(command: CreateEntityTypeCommand, userId?: string, ipAddress?: string): Promise<void> {
    await this.entityTypeService.createEntityType(
      command.ontologyId,
      { name: command.name, description: command.description },
      userId,
      ipAddress
    );
  }
}
