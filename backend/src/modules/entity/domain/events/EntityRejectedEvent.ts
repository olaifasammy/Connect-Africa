import { DomainEvent } from '@shared/domain/DomainEvent';
import { Entity } from '../entities/Entity';

export class EntityRejectedEvent extends DomainEvent {
  constructor(public readonly entity: Entity) {
    super(entity.id);
  }
}
