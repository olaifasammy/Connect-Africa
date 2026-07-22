import { injectable, inject } from 'inversify';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { IAnalyticsRepository } from '../../domain/repositories/IAnalyticsRepository';
import { SystemMetric } from '../../domain/entities/SystemMetric';
import { EntityCreatedEvent } from '@modules/entity/domain/events/EntityCreatedEvent';
import { ArticlePublishedEvent } from '@modules/article/domain/events/ArticlePublishedEvent';

@injectable()
export class AnalyticsEventSubscriber {
  constructor(
    @inject('EventBus') private readonly eventBus: EventBus,
    @inject('IAnalyticsRepository') private readonly repository: IAnalyticsRepository
  ) {}

  async subscribeToAll(): Promise<void> {
    await this.eventBus.subscribe(EntityCreatedEvent, this.handleEntityCreated.bind(this));
    await this.eventBus.subscribe(ArticlePublishedEvent, this.handleArticlePublished.bind(this));
  }

  private async handleEntityCreated(event: EntityCreatedEvent): Promise<void> {
    const metric = SystemMetric.create({
      eventName: 'EntityCreated',
      sourceContext: 'Entity',
      metadata: { entityId: event.entity.id.toString() }
    });
    await this.repository.save(metric);
  }

  private async handleArticlePublished(event: ArticlePublishedEvent): Promise<void> {
    const metric = SystemMetric.create({
      eventName: 'ArticlePublished',
      sourceContext: 'Article',
      metadata: { articleId: event.aggregateId.toString() }
    });
    await this.repository.save(metric);
  }
}
