import { CreateSourceCommand } from '../commands/CreateSourceCommand';
import { ISourceRepository } from '../../domain/repositories/ISourceRepository';
import { Source } from '../../domain/entities/Source';
import { IAuditRepository } from '@modules/audit/public';
import { 
  AuditEntry, 
  AuditActor, 
  AuditResource, 
  AuditMetadata, 
  CorrelationId, 
  Timestamp, 
  UserId, 
  ResourceId, 
  IPAddress, 
  UserAgent 
} from '@modules/audit/public';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class CreateSourceHandler {
  constructor(
    private readonly repository: ISourceRepository,
    private readonly auditRepository: IAuditRepository
  ) {}

  async handle(command: CreateSourceCommand): Promise<string> {
    const source = Source.create({
      title: command.title,
      type: command.type,
      provenance: command.provenance,
      createdAt: new Date()
    });

    await this.repository.save(source);

    const auditEntry = AuditEntry.create({
      action: 'CREATE_SOURCE',
      actor: AuditActor.create({
        userId: new UserId(command.userId),
        actorType: 'USER',
        ipAddress: new IPAddress('127.0.0.1'),
        userAgent: new UserAgent('unknown')
      }),
      resource: AuditResource.create({
        id: new ResourceId(source.id.toString()),
        type: 'SOURCE'
      }),
      metadata: [AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
      correlationId: new CorrelationId(new UniqueEntityId().toString()),
      timestamp: new Timestamp(new Date())
    });
    
    await this.auditRepository.log(auditEntry);
    
    return source.id.toString();
  }
}
