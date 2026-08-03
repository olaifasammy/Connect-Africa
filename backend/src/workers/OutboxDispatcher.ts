import { IOutboxRepository } from '@shared/domain/repositories/IOutboxRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { IUnitOfWork } from '@shared/infrastructure/database/IUnitOfWork';

export class OutboxDispatcher {
  constructor(
    private readonly outboxRepository: IOutboxRepository,
    private readonly eventBus: EventBus,
    private readonly uow: IUnitOfWork,
    private readonly interval: number,
    private readonly batchSize: number
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
