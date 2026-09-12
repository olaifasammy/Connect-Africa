import { provide } from 'inversify-binding-decorators';
import { injectable } from 'inversify';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';

import { CreateOntologyVersionCommand } from '../commands/CreateOntologyVersionCommand';

import { OntologyVersionService } from '../services/OntologyVersionService';

import { OntologyVersionDto } from '../dto/OntologyDtos';

@provide(CreateOntologyVersionCommandHandler, true)
@injectable()
export class CreateOntologyVersionCommandHandler
  implements
    ICommandHandler<
      CreateOntologyVersionCommand,
      OntologyVersionDto
    >
{
  constructor(
    private readonly ontologyVersionService: OntologyVersionService,
  ) {}

  async handle(
    command: CreateOntologyVersionCommand,
  ): Promise<OntologyVersionDto> {
    const version =
      await this.ontologyVersionService.createVersion(
        command.ontologyId,
      );

    return {
      id: version.id.toString(),
      version: version.version,
      isPublished: version.isPublished,
    };
  }
}