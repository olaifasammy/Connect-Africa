import { CreateArticleCommand } from '../commands/CreateArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { Article } from '../../domain/entities/Article';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AuditLogRequestedEvent } from '@modules/audit/domain/events/AuditLogRequestedEvent';
import { ArticleCreatedEvent } from '../../domain/events/ArticleCreatedEvent';

export class CreateArticleHandler {
  constructor(
    private readonly repository: IArticleRepository,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: CreateArticleCommand): Promise<string> {
    const article = Article.create({
      title: command.title,
      summary: command.summary,
      content: command.content,
      authorId: command.authorId,
      language: command.language,
      slug: command.title.toLowerCase().replace(/ /g, '-')
    });

    await this.repository.save(article);

    // Domain event
    await this.eventBus.publish(new ArticleCreatedEvent(article.id));
    
    // Decoupled audit logging
    await this.eventBus.publish(new AuditLogRequestedEvent({
      action: 'CREATE_ARTICLE',
      actorId: command.authorId.toString(),
      actorType: 'USER',
      ipAddress: '127.0.0.1',
      userAgent: 'unknown',
      resourceId: article.id.toString(),
      resourceType: 'ARTICLE',
      metadata: [{ key: 'status', value: 'SUCCESS' }]
    }));

    return article.id.toString();
  }
}
