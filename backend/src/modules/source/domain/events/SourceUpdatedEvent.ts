import { DomainEvent } from '@shared/domain/DomainEvent';
import { SourceId } from '../value-objects/SourceValueObjects';

export class SourceUpdatedEvent extends DomainEvent {
  constructor(public readonly sourceId: SourceId) {
    super(sourceId);
  }
}
