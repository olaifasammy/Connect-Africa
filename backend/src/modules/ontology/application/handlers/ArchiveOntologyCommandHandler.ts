import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { ArchiveOntologyCommand } from '../commands/ArchiveOntologyCommand';
import { OntologyService } from '../services/OntologyService';

export class ArchiveOntologyCommandHandler implements ICommandHandler<ArchiveOntologyCommand, void> {
  constructor(
    private readonly ontologyService: OntologyService
  ) {}

  async handle(command: ArchiveOntologyCommand, userId?: string, ipAddress?: string): Promise<void> {
    await this.ontologyService.archive(
        command.id,
        userId,
        ipAddress
    );
  }
}
