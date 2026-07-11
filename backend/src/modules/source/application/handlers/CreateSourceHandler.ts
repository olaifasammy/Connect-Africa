import { CreateSourceCommand } from '../commands/CreateSourceCommand';
import { ISourceRepository } from '../../domain/repositories/ISourceRepository';
import { Source } from '../../domain/entities/Source';
import { IAuditLogger } from '../../domain/interfaces/SourceServices';

export class CreateSourceHandler {
  constructor(
    private readonly repository: ISourceRepository,
    private readonly auditLogger: IAuditLogger
  ) {}

  async handle(command: CreateSourceCommand): Promise<string> {
    const source = Source.create({
      title: command.title,
      type: command.type,
      provenance: command.provenance,
      createdAt: new Date()
    });

    await this.repository.save(source);
    await this.auditLogger.log('SOURCE_CREATED', { sourceId: source.id.toString(), title: source.title });
    
    return source.id.toString();
  }
}
