import { CreateArticleCommand } from '../commands/CreateArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { Article } from '../../domain/entities/Article';
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

export class CreateArticleHandler {
  constructor(
    private readonly repository: IArticleRepository,
    private readonly auditRepository: IAuditRepository
  ) {}

  async handle(command: CreateArticleCommand): Promise<string> {
    const article = Article.create({
      title: command.title,
      summary: command.summary,
      content: command.content,
      authorId: command.authorId,
      language: command.language,
      slug: command.title.toLowerCase().replace(/ /g, '-') // Basic slugification
    });

    await this.repository.save(article);

    const auditEntry = AuditEntry.create({
      action: 'CREATE_ARTICLE',
      actor: AuditActor.create({
        userId: new UserId(command.authorId.toString()),
        actorType: 'USER',
        ipAddress: new IPAddress('127.0.0.1'),
        userAgent: new UserAgent('unknown')
      }),
      resource: AuditResource.create({
        id: new ResourceId(article.id.toString()),
        type: 'ARTICLE'
      }),
      metadata: [AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
      correlationId: new CorrelationId(new UniqueEntityId().toString()),
      timestamp: new Timestamp(new Date())
    });
    
    await this.auditRepository.log(auditEntry);

    return article.id.toString();
  }
}
