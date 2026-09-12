import { DomainEvent } from '@shared/domain/DomainEvent';
import { SourceId } from '../value-objects/SourceValueObjects';

export class SourceCreatedEvent extends DomainEvent {
  constructor(public readonly sourceId: SourceId) {
    super(sourceId);
  }
}
