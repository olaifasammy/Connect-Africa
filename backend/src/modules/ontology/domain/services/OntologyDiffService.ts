import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { OntologyVersion } from '../entities/OntologyVersion';

export interface DiffResult {
  versionA: number;
  versionB: number;
  summary: {
    addedEntityTypes: string[];
    removedEntityTypes: string[];
    modifiedEntityTypes: string[];
    addedRelationshipTypes: string[];
    removedRelationshipTypes: string[];
    modifiedRelationshipTypes: string[];
  };
  timestamp: Date;
}

@provide(OntologyDiffService, true)
@injectable()
export class OntologyDiffService {
  public diff(
    versionA: OntologyVersion,
    versionB: OntologyVersion,
    schemaA: { entityTypes: string[]; relationshipTypes: string[] } = { entityTypes: [], relationshipTypes: [] },
    schemaB: { entityTypes: string[]; relationshipTypes: string[] } = { entityTypes: [], relationshipTypes: [] }
  ): DiffResult {
    const setAEntity = new Set(schemaA.entityTypes);
    const setBEntity = new Set(schemaB.entityTypes);

    const addedEntityTypes = schemaB.entityTypes.filter(et => !setAEntity.has(et));
    const removedEntityTypes = schemaA.entityTypes.filter(et => !setBEntity.has(et));
    const modifiedEntityTypes = schemaA.entityTypes.filter(et => setBEntity.has(et)); // placeholder for deeper property diff if needed

    const setARel = new Set(schemaA.relationshipTypes);
    const setBRel = new Set(schemaB.relationshipTypes);

    const addedRelationshipTypes = schemaB.relationshipTypes.filter(rt => !setARel.has(rt));
    const removedRelationshipTypes = schemaA.relationshipTypes.filter(rt => !setBRel.has(rt));
    const modifiedRelationshipTypes = schemaA.relationshipTypes.filter(rt => setARel.has(rt) && setBRel.has(rt));

    return {
      versionA: versionA.version,
      versionB: versionB.version,
      summary: {
        addedEntityTypes,
        removedEntityTypes,
        modifiedEntityTypes,
        addedRelationshipTypes,
        removedRelationshipTypes,
        modifiedRelationshipTypes,
      },
      timestamp: new Date(),
    };
  }
}
