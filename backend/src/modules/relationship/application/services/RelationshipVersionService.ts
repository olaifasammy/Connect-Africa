import { Relationship } from '../../domain/entities/Relationship';
import { IRelationshipVersionRepository } from '../../domain/repositories/IRelationshipVersionRepository';
import { RelationshipVersion } from '../../domain/entities/RelationshipVersion';
import { Metadata, VersionNumber } from '../../domain/value-objects/RelationshipValueObjects';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

/**
 * Application service managing relationship versioning.
 */
export class RelationshipVersionService {
  constructor(private readonly repository: IRelationshipVersionRepository) {}

  async createVersion(relationship: Relationship, data: Record<string, any>): Promise<void> {
    const version = new RelationshipVersion({
      relationshipId: relationship.id as any, // Simple cast for implementation
      versionNumber: new VersionNumber(1), // Logic to increment version
      data: new Metadata(data),
      createdAt: new Date(),
    });
    
    await this.repository.save(version);
  }
}
