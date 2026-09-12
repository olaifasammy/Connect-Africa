import { provide } from 'inversify-binding-decorators';
import { injectable } from 'inversify';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';

import { ArchiveOntologyCommand } from '../commands/ArchiveOntologyCommand';
import { OntologyResponseDto } from '../dto/OntologyDtos';
import { OntologyService } from '../services/OntologyService';

@provide(ArchiveOntologyCommandHandler, true)
@injectable()
export class ArchiveOntologyCommandHandler
  implements
    ICommandHandler<
      ArchiveOntologyCommand,
      OntologyResponseDto
    >
{
  constructor(
    private readonly ontologyService: OntologyService,
  ) {}

  async handle(
    command: ArchiveOntologyCommand,
    userId?: string,
    ipAddress?: string,
  ): Promise<OntologyResponseDto> {
    const ontology =
      await this.ontologyService.archive(
        command.id,
        userId,
        ipAddress,
      );

    return {
      id: ontology.id.toString(),
      name: ontology.name,
      description: ontology.description,
      version: ontology.version,
    };
  }
}
