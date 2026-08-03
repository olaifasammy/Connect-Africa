import { Entity } from '../entities/Entity';
import { IEntityPolicy } from './IEntityPolicy';

export class EntityPublishingPolicy implements IEntityPolicy {
  async validate(entity: Entity): Promise<void> { /* Logic */ }
}

export class EntityArchivingPolicy implements IEntityPolicy {
  async validate(entity: Entity): Promise<void> { /* Logic */ }
}

export class DuplicateEntityPolicy implements IEntityPolicy {
  async validate(entity: Entity): Promise<void> { /* Logic */ }
}

export class CanonicalEntityPolicy implements IEntityPolicy {
  async validate(entity: Entity): Promise<void> { /* Logic */ }
}
