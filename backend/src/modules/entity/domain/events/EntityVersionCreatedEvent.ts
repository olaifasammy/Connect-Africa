import { DomainEvent } from '@shared/domain/DomainEvent';
import { EntityVersion } from '../entities/EntityVersion';

export class EntityVersionCreatedEvent extends DomainEvent {
  constructor(public readonly version: EntityVersion) {
    super(version.id);
  }
}
