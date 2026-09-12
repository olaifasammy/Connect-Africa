import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { UnlinkEntityCommand } from '../commands/UnlinkEntityCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { IRevisionRepository } from '../../domain/repositories/IRevisionRepository';
import { IUnitOfWork } from '@shared/infrastructure/database/IUnitOfWork';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { Revision } from '../../domain/entities/Revision';
import { AuditLogRequestedEvent } from '@modules/audit/public';

@provide(UnlinkEntityHandler, true)
@injectable()
export class UnlinkEntityHandler {
  constructor(
    @inject('IArticleRepository') private readonly repository: IArticleRepository,
    @inject('IRevisionRepository') private readonly revisionRepository: IRevisionRepository,
    @inject('IUnitOfWork') private readonly unitOfWork: IUnitOfWork,
    @inject('EventBus') private readonly eventBus: EventBus
  ) {}

  async handle(command: UnlinkEntityCommand): Promise<void> {
    await this.unitOfWork.execute(async () => {
      const article = await this.repository.findById(command.articleId);
      if (!article) {
        throw new Error('Article not found');
      }

      article.removeEntityLink(command.entityId);

      const revision = Revision.create({
        articleId: article.id,
        contentSnapshot: article.snapshot(),
        version: article.version,
        createdAt: article.updatedAt,
        metadata: { reason: 'UNLINK_ENTITY', entityId: command.entityId.toString() }
      });

      await this.repository.save(article);
      await this.revisionRepository.save(revision);

      for (const event of article.domainEvents) {
        await this.eventBus.publish(event);
      }
      article.clearDomainEvents();

      await this.eventBus.publish(new AuditLogRequestedEvent({
        action: 'ARTICLE_UNLINK_ENTITY',
        actorId: command.userId,
        actorType: 'USER',
        ipAddress: '127.0.0.1',
        userAgent: 'unknown',
        resourceId: article.id.toString(),
        resourceType: 'ARTICLE',
        metadata: [
          { key: 'status', value: 'SUCCESS' },
          { key: 'entityId', value: command.entityId.toString() }
        ]
      }));
    });
  }
}
