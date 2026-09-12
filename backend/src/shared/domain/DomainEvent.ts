import { UniqueEntityId } from './UniqueEntityId';

export abstract class DomainEvent {
  public readonly occurredOn: Date;
  public readonly aggregateId: UniqueEntityId;

  constructor(aggregateId: UniqueEntityId) {
    this.occurredOn = new Date();
    this.aggregateId = aggregateId;
  }
}
