import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { UpdateOntologyCommand } from '../commands/UpdateOntologyCommand';
import { OntologyService } from '../services/OntologyService';

export class UpdateOntologyCommandHandler implements ICommandHandler<UpdateOntologyCommand, void> {
  constructor(
    private readonly ontologyService: OntologyService
  ) {}

  async handle(command: UpdateOntologyCommand, userId?: string, ipAddress?: string): Promise<void> {
    await this.ontologyService.update(
        command.id,
        { name: command.name, description: command.description },
        userId,
        ipAddress
    );
  }
}
