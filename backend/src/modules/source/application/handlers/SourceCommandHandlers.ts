import { UpdateSourceCommand, DeleteSourceCommand } from '../commands/SourceCommands';
import { ISourceRepository } from '../../domain/repositories/ISourceRepository';
import { IAuditLogger } from '../../domain/interfaces/SourceServices';

export class UpdateSourceHandler {
  constructor(
    private readonly repository: ISourceRepository,
    private readonly auditLogger: IAuditLogger
  ) {}
  async handle(command: UpdateSourceCommand): Promise<void> {
    const source = await this.repository.findById(command.sourceId);
    if (!source) throw new Error('Source not found');
    
    // TODO: Update source properties
    await this.repository.save(source);
    await this.auditLogger.log('SOURCE_UPDATED', { sourceId: command.sourceId.toString() });
  }
}

export class DeleteSourceHandler {
  constructor(
    private readonly repository: ISourceRepository,
    private readonly auditLogger: IAuditLogger
  ) {}
  async handle(command: DeleteSourceCommand): Promise<void> {
    await this.repository.delete(command.sourceId);
    await this.auditLogger.log('SOURCE_DELETED', { sourceId: command.sourceId.toString() });
  }
}
