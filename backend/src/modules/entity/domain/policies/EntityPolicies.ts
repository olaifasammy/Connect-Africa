import { Entity } from '../entities/Entity';
import { IEntityPolicy } from './IEntityPolicy';
import { IDuplicateDetectionService } from '../services/IDuplicateDetectionService';

export class EntityPublishingPolicy implements IEntityPolicy {
  async validate(entity: Entity): Promise<void> { 
    if (entity.status === 'ARCHIVED') {
        throw new Error('Cannot publish an archived entity.');
    }
  }
}

export class EntityArchivingPolicy implements IEntityPolicy {
  async validate(entity: Entity): Promise<void> { 
    if (entity.status === 'ARCHIVED') {
        throw new Error('Entity is already archived.');
    }
  }
}

export class DuplicateEntityPolicy implements IEntityPolicy {
  constructor(private readonly duplicateDetectionService: IDuplicateDetectionService) {}

  async validate(entity: Entity): Promise<void> { 
    const isDuplicate = await this.duplicateDetectionService.isDuplicate(entity);
    if (isDuplicate) {
        throw new Error('Entity with this name already exists.');
    }
  }
}

export class CanonicalEntityPolicy implements IEntityPolicy {
  async validate(entity: Entity): Promise<void> { 
    // Canonical policy logic: Ensure the entity is not archived if it's considered canonical
    if (entity.status === 'ARCHIVED') {
      throw new Error('Cannot perform operations on an archived canonical entity.');
    }
  }
}
