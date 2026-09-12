import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';

import {
  GraphNode,
  GraphEdge,
} from '../domain/entities/GraphEntities';

import { IGraphRepository } from '../domain/repositories/IGraphRepository';

import {
  GraphConflictError,
  GraphNotFoundError,
  GraphValidationError,
} from '../domain/errors/GraphErrors';

interface EntityRow {
  id: string;
  type: string;
  tags: unknown;
  description?: string | null;
  source?: string | null;
}

interface RelationshipRow {
  id: string;
  source_id: string;
  target_id: string;
  type_id: string;
  properties: unknown;
}

interface PathRow {
  path: string[];
}

function parseJsonObject(
  value: unknown,
  fieldName: string,
): Record<string, unknown> {
  if (
    value === null ||
    typeof value !== 'object' ||
    Array.isArray(value)
  ) {
    throw new GraphValidationError(
      `${fieldName} must be a JSON object.`,
    );
  }

  return { ...(value as Record<string, unknown>) };
}

function parseTags(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is string =>
        typeof item === 'string',
    )
    .map((item) => item.trim())
    .filter(Boolean);
}

@provide('IGraphRepository', true)
@injectable()
export class PostgresGraphRepository
  implements IGraphRepository
{
  constructor(
    @inject('PostgresProvider')
    private readonly provider: PostgresProvider,
  ) {}

  async runInTransaction<T>(
    callback: (client: any) => Promise<T>,
  ): Promise<T> {
    return this.provider.transaction(
      async () => callback(this.provider),
    );
  }

  async getNeighbors(
    entityId: string,
  ): Promise<{
    nodes: GraphNode[];
    edges: GraphEdge[];
  }> {
    const normalizedId =
      this.normalizeId(entityId);

    const result =
      await this.provider.query<RelationshipRow & {
        source_type: string;
        target_type: string;
        source_tags: unknown;
        target_tags: unknown;
      }>(
        `
          SELECT
            r.id,
            r.source_id,
            r.target_id,
            r.type_id,
            r.properties,
            source_entity.type AS source_type,
            target_entity.type AS target_type,
            source_entity.tags AS source_tags,
            target_entity.tags AS target_tags
          FROM relationships r
          JOIN entities source_entity
            ON source_entity.id = r.source_id
          JOIN entities target_entity
            ON target_entity.id = r.target_id
          WHERE r.source_id = $1
             OR r.target_id = $1
          ORDER BY r.created_at ASC, r.id ASC
        `,
        [normalizedId],
      );

    const nodesMap =
      new Map<string, GraphNode>();

    const edges: GraphEdge[] = [];

    for (const row of result.rows) {
      if (!nodesMap.has(row.source_id)) {
        nodesMap.set(
          row.source_id,
          this.mapEntityRow({
            id: row.source_id,
            type: row.source_type,
            tags: row.source_tags,
          }),
        );
      }

      if (!nodesMap.has(row.target_id)) {
        nodesMap.set(
          row.target_id,
          this.mapEntityRow({
            id: row.target_id,
            type: row.target_type,
            tags: row.target_tags,
          }),
        );
      }

      edges.push(
        this.mapRelationshipRow(row),
      );
    }

    return {
      nodes: Array.from(nodesMap.values()),
      edges,
    };
  }

  async findShortestPath(
    startEntityId: string,
    endEntityId: string,
  ): Promise<GraphNode[]> {
    const startId =
      this.normalizeId(startEntityId);

    const endId =
      this.normalizeId(endEntityId);

    if (startId === endId) {
      const node =
        await this.findById(startId);

      return node ? [node] : [];
    }

    const result =
      await this.provider.query<PathRow>(
        `
          WITH RECURSIVE path_cte AS (
            SELECT
              r.target_id AS entity_id,
              ARRAY[r.source_id, r.target_id]::text[] AS path
            FROM relationships r
            WHERE r.source_id = $1

            UNION ALL

            SELECT
              r.target_id,
              pc.path || r.target_id
            FROM relationships r
            JOIN path_cte pc
              ON r.source_id = pc.entity_id
            WHERE NOT (
              r.target_id = ANY(pc.path)
            )
            AND cardinality(pc.path) <= 10
          )
          SELECT path
          FROM path_cte
          WHERE entity_id = $2
          ORDER BY cardinality(path), path
          LIMIT 1
        `,
        [startId, endId],
      );

    if (result.rows.length === 0) {
      return [];
    }

    const entityIds =
      result.rows[0].path;

    return this.loadNodesByIds(entityIds);
  }

  async saveNode(
    _node: GraphNode,
  ): Promise<void> {
    /*
     * Graph nodes are projections of Entity.
     *
     * Entity persistence belongs to the Entity bounded
     * context. This method intentionally performs no node
     * insert and exists only for projection/event compatibility.
     */
    return;
  }

  async findById(
    entityId: string,
  ): Promise<GraphNode | null> {
    const normalizedId =
      this.normalizeId(entityId);

    const result =
      await this.provider.query<EntityRow>(
        `
          SELECT
            id,
            type,
            tags,
            description,
            source
          FROM entities
          WHERE id = $1
          LIMIT 1
        `,
        [normalizedId],
      );

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapEntityRow(
      result.rows[0],
    );
  }

  async updateNode(
    entityId: string,
    metadata: Record<string, any>,
  ): Promise<void> {
    /*
     * Entity owns node state. Graph synchronization is driven
     * by Entity domain events.
     *
     * No direct mutation is performed here.
     */
    this.normalizeId(entityId);

    parseJsonObject(
      metadata,
      'Node metadata',
    );

    return;
  }

  async deleteNode(
    entityId: string,
  ): Promise<void> {
    const normalizedId =
      this.normalizeId(entityId);

    /*
     * Entity deletion cascades through relationships.
     * Graph must not delete the Entity itself.
     *
     * This method therefore exists as a compatibility
     * operation only and removes graph edges explicitly.
     */
    await this.provider.query(
      `
        DELETE FROM relationships
        WHERE source_id = $1
           OR target_id = $1
      `,
      [normalizedId],
    );
  }

  async saveEdge(
    edge: GraphEdge,
  ): Promise<void> {
    const sourceId =
      this.normalizeId(
        edge.sourceEntityId,
      );

    const targetId =
      this.normalizeId(
        edge.targetEntityId,
      );

    const relationshipType =
      this.normalizeId(
        edge.relationshipType,
      );

    const properties =
      parseJsonObject(
        edge.properties,
        'Edge properties',
      );

    try {
      await this.provider.query(
        `
          INSERT INTO relationships (
            id,
            source_id,
            target_id,
            type_id,
            properties
          )
          VALUES (
            gen_random_uuid()::text,
            $1,
            $2,
            $3,
            $4::jsonb
          )
        `,
        [
          sourceId,
          targetId,
          relationshipType,
          JSON.stringify(properties),
        ],
      );
    } catch (error: any) {
      if (error?.code === '23505') {
        throw new GraphConflictError(
          'Graph edge already exists.',
        );
      }

      throw error;
    }
  }

  async updateEdge(
    sourceEntityId: string,
    targetEntityId: string,
    relationshipType: string,
    properties: Record<string, any>,
  ): Promise<void> {
    const sourceId =
      this.normalizeId(sourceEntityId);

    const targetId =
      this.normalizeId(targetEntityId);

    const typeId =
      this.normalizeId(
        relationshipType,
      );

    const normalizedProperties =
      parseJsonObject(
        properties,
        'Edge properties',
      );

    const result =
      await this.provider.query(
        `
          UPDATE relationships
          SET properties =
            properties || $4::jsonb
          WHERE source_id = $1
            AND target_id = $2
            AND type_id = $3
        `,
        [
          sourceId,
          targetId,
          typeId,
          JSON.stringify(
            normalizedProperties,
          ),
        ],
      );

    if ((result.rowCount ?? 0) === 0) {
      throw new GraphNotFoundError(
        'Graph edge not found.',
      );
    }
  }

  async deleteEdge(
    sourceEntityId: string,
    targetEntityId: string,
    relationshipType: string,
  ): Promise<void> {
    const sourceId =
      this.normalizeId(sourceEntityId);

    const targetId =
      this.normalizeId(targetEntityId);

    const typeId =
      this.normalizeId(
        relationshipType,
      );

    const result =
      await this.provider.query(
        `
          DELETE FROM relationships
          WHERE source_id = $1
            AND target_id = $2
            AND type_id = $3
        `,
        [
          sourceId,
          targetId,
          typeId,
        ],
      );

    if ((result.rowCount ?? 0) === 0) {
      throw new GraphNotFoundError(
        'Graph edge not found.',
      );
    }
  }

  async existsEdge(
    sourceEntityId: string,
    targetEntityId: string,
    relationshipType: string,
  ): Promise<boolean> {
    const result =
      await this.provider.query(
        `
          SELECT 1
          FROM relationships
          WHERE source_id = $1
            AND target_id = $2
            AND type_id = $3
          LIMIT 1
        `,
        [
          this.normalizeId(
            sourceEntityId,
          ),
          this.normalizeId(
            targetEntityId,
          ),
          this.normalizeId(
            relationshipType,
          ),
        ],
      );

    return result.rows.length > 0;
  }

  async depthTraversal(
    entityId: string,
    maxDepth: number,
  ): Promise<GraphNode[]> {
    const depth =
      this.validateTraversalDepth(
        maxDepth,
      );

    const startId =
      this.normalizeId(entityId);

    const result =
      await this.provider.query<{
        node_id: string;
        depth: number;
      }>(
        `
          WITH RECURSIVE traversal AS (
            SELECT
              r.target_id AS node_id,
              1 AS depth,
              ARRAY[r.source_id, r.target_id]::text[] AS path
            FROM relationships r
            WHERE r.source_id = $1

            UNION ALL

            SELECT
              r.target_id,
              t.depth + 1,
              t.path || r.target_id
            FROM relationships r
            JOIN traversal t
              ON r.source_id = t.node_id
            WHERE t.depth < $2
              AND NOT (
                r.target_id = ANY(t.path)
              )
          )
          SELECT node_id, MIN(depth) AS depth
          FROM traversal
          GROUP BY node_id
          ORDER BY depth, node_id
        `,
        [startId, depth],
      );

    return this.loadNodesByIds(
      result.rows.map(
        (row) => row.node_id,
      ),
    );
  }

  async breadthTraversal(
    entityId: string,
    maxDepth: number,
  ): Promise<GraphNode[]> {
    const depth =
      this.validateTraversalDepth(
        maxDepth,
      );

    const startId =
      this.normalizeId(entityId);

    const result =
      await this.provider.query<{
        node_id: string;
        depth: number;
      }>(
        `
          WITH RECURSIVE traversal AS (
            SELECT
              r.target_id AS node_id,
              1 AS depth,
              ARRAY[r.source_id, r.target_id]::text[] AS path
            FROM relationships r
            WHERE r.source_id = $1

            UNION ALL

            SELECT
              r.target_id,
              t.depth + 1,
              t.path || r.target_id
            FROM relationships r
            JOIN traversal t
              ON r.source_id = t.node_id
            WHERE t.depth < $2
              AND NOT (
                r.target_id = ANY(t.path)
              )
          )
          SELECT node_id, MIN(depth) AS depth
          FROM traversal
          GROUP BY node_id
          ORDER BY depth ASC, node_id ASC
        `,
        [startId, depth],
      );

    return this.loadNodesByIds(
      result.rows.map(
        (row) => row.node_id,
      ),
    );
  }

  async findByLabel(
    label: string,
    limit: number,
    offset: number,
  ): Promise<GraphNode[]> {
    const normalizedLabel =
      label?.trim();

    if (!normalizedLabel) {
      throw new GraphValidationError(
        'Graph label cannot be empty.',
      );
    }

    const safeLimit =
      this.validatePaginationLimit(
        limit,
      );

    const safeOffset =
      this.validatePaginationOffset(
        offset,
      );

    const result =
      await this.provider.query<EntityRow>(
        `
          SELECT
            id,
            type,
            tags,
            description,
            source
          FROM entities
          WHERE tags @>
            jsonb_build_array($1::text)
          ORDER BY id ASC
          LIMIT $2
          OFFSET $3
        `,
        [
          normalizedLabel,
          safeLimit,
          safeOffset,
        ],
      );

    return result.rows.map(
      (row) =>
        this.mapEntityRow(row),
    );
  }

  async findByOntologyType(
    type: string,
    limit: number,
    offset: number,
  ): Promise<GraphNode[]> {
    const normalizedType =
      this.normalizeId(type);

    const safeLimit =
      this.validatePaginationLimit(
        limit,
      );

    const safeOffset =
      this.validatePaginationOffset(
        offset,
      );

    const result =
      await this.provider.query<EntityRow>(
        `
          SELECT
            id,
            type,
            tags,
            description,
            source
          FROM entities
          WHERE type = $1
          ORDER BY id ASC
          LIMIT $2
          OFFSET $3
        `,
        [
          normalizedType,
          safeLimit,
          safeOffset,
        ],
      );

    return result.rows.map(
      (row) =>
        this.mapEntityRow(row),
    );
  }

  async findEdgesByType(
    typeId: string,
    limit: number,
    offset: number,
  ): Promise<GraphEdge[]> {
    const normalizedType =
      this.normalizeId(typeId);

    const safeLimit =
      this.validatePaginationLimit(
        limit,
      );

    const safeOffset =
      this.validatePaginationOffset(
        offset,
      );

    const result =
      await this.provider.query<RelationshipRow>(
        `
          SELECT
            id,
            source_id,
            target_id,
            type_id,
            properties
          FROM relationships
          WHERE type_id = $1
          ORDER BY id ASC
          LIMIT $2
          OFFSET $3
        `,
        [
          normalizedType,
          safeLimit,
          safeOffset,
        ],
      );

    return result.rows.map(
      (row) =>
        this.mapRelationshipRow(row),
    );
  }

  async filterByMetadata(
    criteria: Record<string, any>,
    limit: number,
    offset: number,
  ): Promise<GraphNode[]> {
    const normalizedCriteria =
      parseJsonObject(
        criteria,
        'Metadata criteria',
      );

    const safeLimit =
      this.validatePaginationLimit(
        limit,
      );

    const safeOffset =
      this.validatePaginationOffset(
        offset,
      );

    /*
     * Dynamic Entity metadata currently lives in Entity
     * versions and EntityMetadata. The existing entities
     * table does not expose an attributes JSONB column.
     *
     * Until the Entity persistence contract exposes attributes
     * directly, metadata filtering must not pretend that tags
     * are attributes.
     *
     * Return no matches rather than silently applying the
     * wrong semantics.
     */
    if (
      Object.keys(
        normalizedCriteria,
      ).length === 0
    ) {
      return [];
    }

    void safeLimit;
    void safeOffset;

    return [];
  }

  async countNodes(): Promise<number> {
    const result =
      await this.provider.query<{
        count: string;
      }>(
        `
          SELECT COUNT(*)::text AS count
          FROM entities
        `,
      );

    return Number(
      result.rows[0].count,
    );
  }

  async countEdges(): Promise<number> {
    const result =
      await this.provider.query<{
        count: string;
      }>(
        `
          SELECT COUNT(*)::text AS count
          FROM relationships
        `,
      );

    return Number(
      result.rows[0].count,
    );
  }

  private async loadNodesByIds(
    ids: string[],
  ): Promise<GraphNode[]> {
    if (ids.length === 0) {
      return [];
    }

    const uniqueIds =
      Array.from(new Set(ids));

    const result =
      await this.provider.query<EntityRow>(
        `
          SELECT
            id,
            type,
            tags,
            description,
            source
          FROM entities
          WHERE id = ANY($1::text[])
        `,
        [uniqueIds],
      );

    const nodesById =
      new Map(
        result.rows.map(
          (row) => [
            row.id,
            this.mapEntityRow(row),
          ],
        ),
      );

    return ids
      .map(
        (id) =>
          nodesById.get(id),
      )
      .filter(
        (
          node,
        ): node is GraphNode =>
          node !== undefined,
      );
  }

  private mapEntityRow(
    row: EntityRow,
  ): GraphNode {
    return new GraphNode(
      row.id,
      row.type,
      parseTags(row.tags),
      {
        ...(row.description
          ? {
              description:
                row.description,
            }
          : {}),
        ...(row.source
          ? {
              source: row.source,
            }
          : {}),
      },
    );
  }

  private mapRelationshipRow(
    row: RelationshipRow,
  ): GraphEdge {
    return new GraphEdge(
      row.source_id,
      row.target_id,
      row.type_id,
      parseJsonObject(
        row.properties,
        'Edge properties',
      ),
    );
  }

  private normalizeId(
    value: string,
  ): string {
    const normalized =
      value?.trim();

    if (!normalized) {
      throw new GraphValidationError(
        'Graph identifier cannot be empty.',
      );
    }

    return normalized;
  }

  private validateTraversalDepth(
    value: number,
  ): number {
    if (
      !Number.isInteger(value) ||
      value < 1 ||
      value > 10
    ) {
      throw new GraphValidationError(
        'Graph traversal depth must be an integer between 1 and 10.',
      );
    }

    return value;
  }

  private validatePaginationLimit(
    value: number,
  ): number {
    if (
      !Number.isInteger(value) ||
      value < 1 ||
      value > 100
    ) {
      throw new GraphValidationError(
        'Graph pagination limit must be an integer between 1 and 100.',
      );
    }

    return value;
  }

  private validatePaginationOffset(
    value: number,
  ): number {
    if (
      !Number.isInteger(value) ||
      value < 0
    ) {
      throw new GraphValidationError(
        'Graph pagination offset must be an integer greater than or equal to 0.',
      );
    }

    return value;
  }
}
