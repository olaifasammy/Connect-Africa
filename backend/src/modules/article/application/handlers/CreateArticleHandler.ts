import {
  provide,
} from 'inversify-binding-decorators';

import {
  injectable,
  inject,
} from 'inversify';

import {
  CreateArticleCommand,
} from '../commands/CreateArticleCommand';

import {
  IArticleRepository,
} from '../../domain/repositories/IArticleRepository';

import {
  IRevisionRepository,
} from '../../domain/repositories/IRevisionRepository';

import {
  Article,
} from '../../domain/entities/Article';

import {
  Revision,
} from '../../domain/entities/Revision';

import {
  EventBus,
} from '@shared/infrastructure/queue/EventBus';

import {
  IUnitOfWork,
} from '@shared/infrastructure/database/IUnitOfWork';

import {
  AuditLogRequestedEvent,
} from '@modules/audit/public';

@provide(
  CreateArticleHandler,
  true,
)
@injectable()
export class CreateArticleHandler {
  constructor(
    @inject('IArticleRepository')
    private readonly repository: IArticleRepository,

    @inject('IRevisionRepository')
    private readonly revisionRepository: IRevisionRepository,

    @inject('IUnitOfWork')
    private readonly unitOfWork: IUnitOfWork,

    @inject('EventBus')
    private readonly eventBus: EventBus,
  ) {}

  async handle(
    command: CreateArticleCommand,
  ): Promise<string> {
    const article =
      Article.create({
        title:
          command.title,
        summary:
          command.summary,
        content:
          command.content,
        authorId:
          command.authorId,
        language:
          command.language,
        slug:
          command.title
            .toLowerCase()
            .trim()
            .replace(
              /\s+/g,
              '-',
            ),
      });

    const revision =
      Revision.create({
        articleId:
          article.id,

        contentSnapshot:
          article.snapshot(),

        version:
          article.version,

        createdAt:
          article.createdAt,

        metadata: {
          reason:
            'INITIAL_CREATION',
        },
      });

    await this.unitOfWork.execute(
      async () => {
        await this.repository.save(
          article,
        );

        await this.revisionRepository.save(
          revision,
        );
      },
    );

    for (
      const event of article.domainEvents
    ) {
      await this.eventBus.publish(
        event,
      );
    }

    article.clearDomainEvents();

    await this.eventBus.publish(
      new AuditLogRequestedEvent({
        action:
          'CREATE_ARTICLE',
        actorId:
          command.authorId.toString(),
        actorType:
          'USER',
        ipAddress:
          '127.0.0.1',
        userAgent:
          'unknown',
        resourceId:
          article.id.toString(),
        resourceType:
          'ARTICLE',
        metadata: [
          {
            key:
              'status',
            value:
              'SUCCESS',
          },
          {
            key:
              'revision',
            value:
              String(
                revision.version,
              ),
          },
        ],
      }),
    );

    return article.id.toString();
  }
}
