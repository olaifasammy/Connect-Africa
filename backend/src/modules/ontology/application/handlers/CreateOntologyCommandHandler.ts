import { provide } from 'inversify-binding-decorators';
import { injectable } from 'inversify';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';

import { CreateOntologyCommand } from '@modules/ontology/application/commands/CreateOntologyCommand';

import { OntologyResponseDto } from '@modules/ontology/application/dto/OntologyDtos';

import { OntologyService } from '@modules/ontology/application/services/OntologyService';

@provide(CreateOntologyCommandHandler, true)
@injectable()
export class CreateOntologyCommandHandler
  implements
    ICommandHandler<
      CreateOntologyCommand,
      OntologyResponseDto
    >
{
  constructor(
    private readonly ontologyService: OntologyService,
  ) {}

  async handle(
    command: CreateOntologyCommand,
    userId?: string,
    ipAddress?: string,
  ): Promise<OntologyResponseDto> {
    const ontology =
      await this.ontologyService.create(
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