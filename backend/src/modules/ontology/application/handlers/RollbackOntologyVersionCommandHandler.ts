import { provide } from 'inversify-binding-decorators';
import { injectable } from 'inversify';
import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { RollbackOntologyVersionCommand } from '../commands/RollbackOntologyVersionCommand';
import { OntologyVersionService } from '../services/OntologyVersionService';

@provide(RollbackOntologyVersionCommandHandler, true)
@injectable()
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
