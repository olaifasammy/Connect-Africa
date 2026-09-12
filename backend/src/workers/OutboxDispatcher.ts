import { IOutboxRepository } from '@shared/domain/repositories/IOutboxRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { IUnitOfWork } from '@shared/infrastructure/database/IUnitOfWork';
import { injectable, inject } from 'inversify';
import { env } from '@config/env';

export class OutboxDispatcher {
  constructor(
    @inject('IOutboxRepository') private readonly outboxRepository: IOutboxRepository,
    @inject('EventBus') private readonly eventBus: EventBus,
    @inject('IUnitOfWork') private readonly uow: IUnitOfWork,
    private readonly interval: number = parseInt(env.OUTBOX_POLLING_INTERVAL || '5000', 10),
    private readonly batchSize: number = parseInt(env.OUTBOX_BATCH_SIZE || '50', 10)
  ) {}

  start() {
    setInterval(async () => {
      await this.dispatch();
    }, this.interval);
  }

  private async dispatch() {
    const entries = await this.outboxRepository.getPending(this.batchSize);
    for (const entry of entries) {
      try {
        await this.eventBus.publish(entry.payload);
        await this.outboxRepository.markProcessed(entry.id.toString());
      } catch (error) {
        console.error(`Failed to dispatch event: ${entry.id.toString()}`, error);
      }
    }
  }
}
