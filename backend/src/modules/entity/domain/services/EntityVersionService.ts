import { Entity } from '../entities/Entity';
import { EntityVersion } from '../entities/EntityVersion';
import { IEntityVersionService } from './IEntityVersionService';
import { IEntityVersionRepository } from '../repositories/IEntityVersionRepository';
import { VersionNumber } from '../value-objects/EntityValueObjects';

export class EntityVersionService implements IEntityVersionService {
  constructor(private readonly entityVersionRepository: IEntityVersionRepository) {}

  async createVersion(entity: Entity): Promise<EntityVersion> {
    // Basic versioning logic
    const version = EntityVersion.create({
        entityId: entity.entityId,
        versionNumber: new VersionNumber(1), // Default to version 1
        metadata: entity.metadata,
        createdAt: new Date()
    });
    await this.entityVersionRepository.save(version);
    return version;
  }
}
