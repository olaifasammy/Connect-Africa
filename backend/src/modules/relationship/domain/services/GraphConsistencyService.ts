import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Relationship } from '../entities/Relationship';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { RelationshipValidationError } from '../errors/RelationshipErrors';

/**
 * Service responsible for ensuring consistency within the knowledge graph
 * before and after relationship changes.
 */
@provide(GraphConsistencyService, true)
@injectable()
export class GraphConsistencyService {
  constructor(private readonly postgresProvider: PostgresProvider) {}

  /**
   * Ensures that both source and target entities exist and are active in the database.
   */
  async ensureConsistency(relationship: Relationship): Promise<void> {
    const sourceId = relationship.sourceEntityId.value;
    const targetId = relationship.targetEntityId.value;

    if (sourceId === targetId) {
      throw new RelationshipValidationError(
        'Graph Invariant Violation: Source and Target entities cannot be identical.',
      );
    }

    const query = `
      SELECT id, status
      FROM entities
      WHERE id IN ($1, $2);
    `;

    const result = await this.postgresProvider.query(query, [sourceId, targetId]);

    if (result.rows.length < 2) {
      const foundIds = new Set(result.rows.map((row: any) => row.id));
      const missingIds = [sourceId, targetId].filter((id) => !foundIds.has(id));
      throw new RelationshipValidationError(
        `Graph Invariant Violation: Referenced entity node(s) [${missingIds.join(', ')}] do not exist.`,
      );
    }

    for (const row of result.rows) {
      if (row.status === 'ARCHIVED') {
        throw new RelationshipValidationError(
          `Graph Invariant Violation: Entity node [${row.id}] is archived and cannot receive new relationships.`,
        );
      }
    }
  }
}
