import { provide } from 'inversify-binding-decorators';
import { injectable } from 'inversify';
import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { PublishOntologyVersionCommand } from '../commands/PublishOntologyVersionCommand';
import { OntologyVersionService } from '../services/OntologyVersionService';

@provide(PublishOntologyVersionCommandHandler, true)
@injectable()
export class PublishOntologyVersionCommandHandler implements ICommandHandler<PublishOntologyVersionCommand, void> {
  constructor(
    private readonly ontologyVersionService: OntologyVersionService
  ) {}

  async handle(command: PublishOntologyVersionCommand): Promise<void> {
    await this.ontologyVersionService.publishVersion(
        command.id
    );
  }
}
