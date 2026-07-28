import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { logger } from '@shared/logger/Logger';
import { container } from '@bootstrap/container/container';
import { ArticlePublishedIndexer } from '@modules/search/application/events/ArticlePublishedIndexer';
import { ArticlePublishedEvent, ArticleUpdatedEvent } from '@modules/article/public';
import { EntityCreatedHandler } from '@modules/graph/application/events/EntityCreatedHandler';
import { EntityUpdatedHandler } from '@modules/graph/application/events/EntityUpdatedHandler';
import { EntityDeletedHandler } from '@modules/graph/application/events/EntityDeletedHandler';
import { RelationshipCreatedHandler } from '@modules/graph/application/events/RelationshipCreatedHandler';
import { RelationshipDeletedHandler } from '@modules/graph/application/events/RelationshipDeletedHandler';
import { ArticleLinkedToEntityHandler } from '@modules/entity/application/events/ArticleLinkedToEntityHandler';
import { ArticleLinkedToRelationshipHandler } from '@modules/relationship/application/events/ArticleLinkedToRelationshipHandler';
import { ArticleLinkedToMediaHandler } from '@modules/media/application/events/ArticleLinkedToMediaHandler';
import { EntityCreatedEvent, EntityUpdatedEvent, EntityDeletedEvent } from '@modules/entity/public';
import { RelationshipCreatedEvent, RelationshipDeletedEvent } from '@modules/relationship/public';
import { EventBus } from '@shared/infrastructure/queue/EventBus';

export class BootstrapService {
  private static pgProvider: PostgresProvider;

  static async run(): Promise<void> {
    logger.info('Starting application bootstrap...');

    // Initialize Database
    this.pgProvider = new PostgresProvider();
    await this.pgProvider.connect();

    // Register Event Subscribers
    const eventBus = container.get<EventBus>('EventBus');
    
    const articlePublishedIndexer = container.get(ArticlePublishedIndexer);
    await eventBus.subscribe(ArticlePublishedEvent.name, async (event: any) => {
        await articlePublishedIndexer.handle(event);
    });

    const articleLinkedToEntityHandler = container.get(ArticleLinkedToEntityHandler);
    await eventBus.subscribe(ArticleUpdatedEvent.name, async (event: any) => {
        await articleLinkedToEntityHandler.handle(event);
    });

    const articleLinkedToRelationshipHandler = container.get(ArticleLinkedToRelationshipHandler);
    await eventBus.subscribe(ArticleUpdatedEvent.name, async (event: any) => {
        await articleLinkedToRelationshipHandler.handle(event);
    });
    
    const articleLinkedToMediaHandler = container.get(ArticleLinkedToMediaHandler);
    await eventBus.subscribe(ArticleUpdatedEvent.name, async (event: any) => {
        await articleLinkedToMediaHandler.handle(event);
    });

    const entityCreatedHandler = container.get(EntityCreatedHandler);
    await eventBus.subscribe(EntityCreatedEvent.name, async (event: any) => {
        await entityCreatedHandler.handle(event);
    });

    const entityUpdatedHandler = container.get(EntityUpdatedHandler);
    await eventBus.subscribe(EntityUpdatedEvent.name, async (event: any) => {
        await entityUpdatedHandler.handle(event);
    });

    const entityDeletedHandler = container.get(EntityDeletedHandler);
    await eventBus.subscribe(EntityDeletedEvent.name, async (event: any) => {
        await entityDeletedHandler.handle(event);
    });

    const relationshipCreatedHandler = container.get(RelationshipCreatedHandler);
    await eventBus.subscribe(RelationshipCreatedEvent.name, async (event: any) => {
        await relationshipCreatedHandler.handle(event);
    });

    const relationshipDeletedHandler = container.get(RelationshipDeletedHandler);
    await eventBus.subscribe(RelationshipDeletedEvent.name, async (event: any) => {
        await relationshipDeletedHandler.handle(event);
    });
    
    logger.info('Application bootstrap completed successfully.');
  }

  static async shutdown(): Promise<void> {
    logger.info('Starting application shutdown...');

    // Close Database
    if (this.pgProvider) {
      await this.pgProvider.disconnect();
    }

    logger.info('Application shutdown completed successfully.');
  }
}
