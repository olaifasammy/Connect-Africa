import {
  provide,
} from 'inversify-binding-decorators';

import {
  injectable,
  inject,
} from 'inversify';

import {
  UpdateArticleCommand,
} from '../commands/UpdateArticleCommand';

import {
  IArticleRepository,
} from '../../domain/repositories/IArticleRepository';

import {
  IRevisionRepository,
} from '../../domain/repositories/IRevisionRepository';

import {
  Revision,
} from '../../domain/entities/Revision';

import {
  IUnitOfWork,
} from '@shared/infrastructure/database/IUnitOfWork';

import {
  EventBus,
} from '@shared/infrastructure/queue/EventBus';

@provide(
  UpdateArticleHandler,
  true,
)
@injectable()
export class UpdateArticleHandler {
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
    command: UpdateArticleCommand,
  ): Promise<void> {
    await this.unitOfWork.execute(
      async () => {
        const article =
          await this.repository.findById(
            command.articleId,
          );

        if (!article) {
          throw new Error(
            'Article not found.',
          );
        }

        article.update(
          command.title,
          command.summary,
          command.content,
        );

        const revision =
          Revision.create({
            articleId:
              article.id,

            contentSnapshot:
              article.snapshot(),

            version:
              article.version,

            createdAt:
              article.updatedAt,

            metadata: {
              reason:
                'ARTICLE_UPDATE',
            },
          });

        await this.repository.save(
          article,
        );

        await this.revisionRepository.save(
          revision,
        );

        for (
          const event of article.domainEvents
        ) {
          await this.eventBus.publish(
            event,
          );
        }

        article.clearDomainEvents();
      },
    );
  }
}
