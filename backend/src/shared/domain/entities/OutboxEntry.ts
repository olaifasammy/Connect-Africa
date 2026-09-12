import { AggregateRoot } from '../AggregateRoot';
import { UniqueEntityId } from '../UniqueEntityId';

export class OutboxEntry extends AggregateRoot<any> {
  constructor(
    public readonly entryId: UniqueEntityId,
    public readonly eventType: string,
    public readonly payload: any,
    public readonly createdAt: Date = new Date(),
    public processed: boolean = false
  ) {
    super({}, entryId);
  }
}
