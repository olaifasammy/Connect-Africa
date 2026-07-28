import { UpdateSourceCommand, DeleteSourceCommand } from '../commands/SourceCommands';
import { ISourceRepository } from '../../domain/repositories/ISourceRepository';

export class UpdateSourceHandler {
  constructor(private readonly repository: ISourceRepository) {}
  async handle(command: UpdateSourceCommand): Promise<void> {
    const source = await this.repository.findById(command.sourceId);
    if (!source) throw new Error('Source not found');
    await this.repository.save(source);
  }
}

export class DeleteSourceHandler {
  constructor(private readonly repository: ISourceRepository) {}
  async handle(command: DeleteSourceCommand): Promise<void> {
    await this.repository.delete(command.sourceId);
  }
}
