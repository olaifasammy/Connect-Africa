import { provide } from 'inversify-binding-decorators';
import { injectable } from 'inversify';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';

import { UpdateOntologyCommand } from '../commands/UpdateOntologyCommand';
import { OntologyResponseDto } from '../dto/OntologyDtos';
import { OntologyService } from '../services/OntologyService';

@provide(UpdateOntologyCommandHandler, true)
@injectable()
export class UpdateOntologyCommandHandler
  implements
    ICommandHandler<
      UpdateOntologyCommand,
      OntologyResponseDto
    >
{
  constructor(
    private readonly ontologyService: OntologyService,
  ) {}

  async handle(
    command: UpdateOntologyCommand,
    userId?: string,
    ipAddress?: string,
  ): Promise<OntologyResponseDto> {
    const ontology =
      await this.ontologyService.update(
        command.id,
        {
          name: command.name,
          description: command.description,
        },
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
