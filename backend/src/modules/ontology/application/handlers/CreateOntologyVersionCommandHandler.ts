import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { CreateOntologyVersionCommand } from '../commands/CreateOntologyVersionCommand';
import { OntologyVersionService } from '../services/OntologyVersionService';

export class CreateOntologyVersionCommandHandler implements ICommandHandler<CreateOntologyVersionCommand, void> {
  constructor(
    private readonly ontologyVersionService: OntologyVersionService
  ) {}

  async handle(command: CreateOntologyVersionCommand): Promise<void> {
    await this.ontologyVersionService.createVersion(
        command.ontologyId,
        command.version
    );
  }
}
