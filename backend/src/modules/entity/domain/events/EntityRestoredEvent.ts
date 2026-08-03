import { DomainEvent } from '@shared/domain/DomainEvent';
import { Entity } from '../entities/Entity';

export class EntityRestoredEvent extends DomainEvent {
  constructor(public readonly entity: Entity) {
    super(entity.id);
  }
}
