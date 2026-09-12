import { provide } from 'inversify-binding-decorators';
import { injectable } from 'inversify';
import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { PublishOntologyCommand } from '../commands/PublishOntologyCommand';
import { OntologyService } from '../services/OntologyService';

@provide(PublishOntologyCommandHandler, true)
@injectable()
export class PublishOntologyCommandHandler implements ICommandHandler<PublishOntologyCommand, void> {
  constructor(
    private readonly ontologyService: OntologyService
  ) {}

  async handle(command: PublishOntologyCommand, userId?: string, ipAddress?: string): Promise<void> {
    await this.ontologyService.publish(
        command.id,
        userId,
        ipAddress
    );
  }
}
