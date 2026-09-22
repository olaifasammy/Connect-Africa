import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';

export interface ConnectedEntityNode {
  id: string;
  name: string;
  type: string;
  slug: string;
  description: string | null;
  verificationStatus: string;
  relationshipId: string;
  relationshipTypeId: string;
  relationshipName?: string;
  direction: 'OUTGOING' | 'INCOMING';
  depth: number;
}

export interface SubGraphEdge {
  id: string;
  sourceId: string;
  targetId: string;
  typeId: string;
  typeName?: string;
}

export interface SubGraphResult {
  rootEntityId: string;
  nodes: ConnectedEntityNode[];
  edges: SubGraphEdge[];
}

export interface GraphPathStep {
  entityId: string;
  entityName: string;
  entityType: string;
  relationshipId?: string;
  relationshipType?: string;
}

export interface GraphPathResult {
  sourceId: string;
  targetId: string;
  depth: number;
  steps: GraphPathStep[];
}

/**
 * Enterprise Application service for high-performance Graph Traversal operations
 * utilizing PostgreSQL Recursive Common Table Expressions (CTEs).
 */
@provide(GraphTraversalService, true)
@injectable()
export class GraphTraversalService {
  constructor(private readonly postgresProvider: PostgresProvider) {}

  /**
   * Retrieves all entities directly or indirectly connected to an entity up to maxDepth.
   */
  async getConnectedEntities(
    entityId: string,
    maxDepth: number = 2,
  ): Promise<ConnectedEntityNode[]> {
    const depthLimit = Math.min(Math.max(1, maxDepth), 5);

    const query = `
      WITH RECURSIVE graph_cte AS (
        -- Anchor member: direct relationships
        SELECT
          r.id AS rel_id,
          r.source_id,
          r.target_id,
          r.type_id,
          CASE WHEN r.source_id = $1 THEN r.target_id ELSE r.source_id END AS connected_entity_id,
          CASE WHEN r.source_id = $1 THEN 'OUTGOING' ELSE 'INCOMING' END AS direction,
          1 AS depth,
          ARRAY[CASE WHEN r.source_id = $1 THEN r.target_id ELSE r.source_id END] AS visited_path
        FROM relationships r
        WHERE r.source_id = $1 OR r.target_id = $1

        UNION ALL

        -- Recursive member: traverse edges
        SELECT
          r.id AS rel_id,
          r.source_id,
          r.target_id,
          r.type_id,
          CASE WHEN r.source_id = g.connected_entity_id THEN r.target_id ELSE r.source_id END AS connected_entity_id,
          CASE WHEN r.source_id = g.connected_entity_id THEN 'OUTGOING' ELSE 'INCOMING' END AS direction,
          g.depth + 1 AS depth,
          g.visited_path || CASE WHEN r.source_id = g.connected_entity_id THEN r.target_id ELSE r.source_id END
        FROM relationships r
        INNER JOIN graph_cte g ON (
          (r.source_id = g.connected_entity_id AND r.target_id != ALL(g.visited_path)) OR
          (r.target_id = g.connected_entity_id AND r.source_id != ALL(g.visited_path))
        )
        WHERE g.depth < $2
      )
      SELECT DISTINCT ON (g.connected_entity_id)
        g.rel_id,
        g.type_id,
        g.connected_entity_id,
        g.direction,
        g.depth,
        e.id AS entity_id,
        e.name AS entity_name,
        e.type AS entity_type,
        e.slug AS entity_slug,
        e.description AS entity_description,
        e.verification_status,
        rt.name AS relationship_name
      FROM graph_cte g
      INNER JOIN entities e ON e.id = g.connected_entity_id
      LEFT JOIN relationship_types rt ON rt.id = g.type_id
      ORDER BY g.connected_entity_id, g.depth ASC;
    `;

    const result = await this.postgresProvider.query(query, [entityId, depthLimit]);

    return result.rows.map((row: any) => ({
      id: row.entity_id,
      name: row.entity_name,
      type: row.entity_type,
      slug: row.entity_slug,
      description: row.entity_description,
      verificationStatus: row.verification_status || 'UNVERIFIED',
      relationshipId: row.rel_id,
      relationshipTypeId: row.type_id,
      relationshipName: row.relationship_name,
      direction: row.direction as 'OUTGOING' | 'INCOMING',
      depth: Number(row.depth),
    }));
  }

  /**
   * Discovers the ecosystem sub-graph (nodes + edges) centered around a root entity.
   */
  async getEcosystemSubGraph(
    entityId: string,
    depth: number = 2,
  ): Promise<SubGraphResult> {
    const nodes = await this.getConnectedEntities(entityId, depth);
    const nodeIds = [entityId, ...nodes.map((n) => n.id)];

    const edgesQuery = `
      SELECT
        r.id,
        r.source_id,
        r.target_id,
        r.type_id,
        rt.name AS type_name
      FROM relationships r
      LEFT JOIN relationship_types rt ON rt.id = r.type_id
      WHERE r.source_id = ANY($1::text[])
        AND r.target_id = ANY($1::text[])
    `;

    const edgesResult = await this.postgresProvider.query(edgesQuery, [nodeIds]);

    const edges: SubGraphEdge[] = edgesResult.rows.map((row: any) => ({
      id: row.id,
      sourceId: row.source_id,
      targetId: row.target_id,
      typeId: row.type_id,
      typeName: row.type_name,
    }));

    return {
      rootEntityId: entityId,
      nodes,
      edges,
    };
  }

  /**
   * Finds the shortest path between a source entity and target entity using Breadth-First Search CTE.
   */
  async findShortestPath(
    sourceEntityId: string,
    targetEntityId: string,
    maxDepth: number = 4,
  ): Promise<GraphPathResult | null> {
    if (sourceEntityId === targetEntityId) {
      return null;
    }

    const query = `
      WITH RECURSIVE search_graph AS (
        SELECT
          r.source_id,
          r.target_id,
          r.type_id,
          1 AS depth,
          ARRAY[r.source_id, r.target_id] AS path,
          ARRAY[r.id] AS rel_path
        FROM relationships r
        WHERE r.source_id = $1 OR r.target_id = $1

        UNION ALL

        SELECT
          r.source_id,
          r.target_id,
          r.type_id,
          sg.depth + 1,
          sg.path || CASE WHEN r.source_id = sg.path[array_length(sg.path, 1)] THEN r.target_id ELSE r.source_id END,
          sg.rel_path || r.id
        FROM relationships r
        INNER JOIN search_graph sg ON (
          (r.source_id = sg.path[array_length(sg.path, 1)] AND r.target_id != ALL(sg.path)) OR
          (r.target_id = sg.path[array_length(sg.path, 1)] AND r.source_id != ALL(sg.path))
        )
        WHERE sg.depth < $2 AND $2 != ALL(sg.path)
      )
      SELECT path, rel_path, depth
      FROM search_graph
      WHERE path[array_length(path, 1)] = $2
      ORDER BY depth ASC
      LIMIT 1;
    `;

    const result = await this.postgresProvider.query(query, [sourceEntityId, targetEntityId, maxDepth]);

    if (result.rows.length === 0) {
      return null;
    }

    const pathEntityIds: string[] = result.rows[0].path;

    // Fetch entity details for steps
    const entitiesResult = await this.postgresProvider.query(
      `SELECT id, name, type FROM entities WHERE id = ANY($1::text[])`,
      [pathEntityIds],
    );

    const entityMap = new Map<string, { name: string; type: string }>();
    entitiesResult.rows.forEach((row: any) => {
      entityMap.set(row.id, { name: row.name, type: row.type });
    });

    const steps: GraphPathStep[] = pathEntityIds.map((id) => {
      const details = entityMap.get(id);
      return {
        entityId: id,
        entityName: details?.name || 'Unknown Entity',
        entityType: details?.type || 'UNKNOWN',
      };
    });

    return {
      sourceId: sourceEntityId,
      targetId: targetEntityId,
      depth: Number(result.rows[0].depth),
      steps,
    };
  }
}
