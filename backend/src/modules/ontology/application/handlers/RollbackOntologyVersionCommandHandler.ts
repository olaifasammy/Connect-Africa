import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { RollbackOntologyVersionCommand } from '../commands/RollbackOntologyVersionCommand';
import { OntologyVersionService } from '../services/OntologyVersionService';

export class RollbackOntologyVersionCommandHandler implements ICommandHandler<RollbackOntologyVersionCommand, void> {
  constructor(
    private readonly ontologyVersionService: OntologyVersionService
  ) {}

  async handle(command: RollbackOntologyVersionCommand): Promise<void> {
    await this.ontologyVersionService.rollbackVersion(
        command.id
    );
  }
}
