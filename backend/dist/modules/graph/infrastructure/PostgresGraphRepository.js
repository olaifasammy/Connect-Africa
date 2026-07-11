"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresGraphRepository = void 0;
const GraphEntities_1 = require("../domain/entities/GraphEntities");
const crypto_1 = require("crypto");
class PostgresGraphRepository {
    db;
    constructor(db) {
        this.db = db;
    }
    async runInTransaction(callback) {
        const client = await this.db.connect();
        try {
            await client.query('BEGIN');
            const result = await callback(client);
            await client.query('COMMIT');
            return result;
        }
        catch (e) {
            await client.query('ROLLBACK');
            throw e;
        }
        finally {
            client.release();
        }
    }
    async getNeighbors(entityId) {
        const query = `
      SELECT 
        r.id as relationship_id,
        r.source_id,
        r.target_id,
        r.type_id,
        e_source.type as source_type,
        e_target.type as target_type
      FROM relationships r
      JOIN entities e_source ON r.source_id = e_source.id
      JOIN entities e_target ON r.target_id = e_target.id
      WHERE r.source_id = $1 OR r.target_id = $1
    `;
        const result = await this.db.query(query, [entityId]);
        const nodesMap = new Map();
        const edges = [];
        for (const row of result.rows) {
            if (!nodesMap.has(row.source_id)) {
                nodesMap.set(row.source_id, new GraphEntities_1.GraphNode(row.source_id, row.source_type, [], {}));
            }
            if (!nodesMap.has(row.target_id)) {
                nodesMap.set(row.target_id, new GraphEntities_1.GraphNode(row.target_id, row.target_type, [], {}));
            }
            edges.push(new GraphEntities_1.GraphEdge(row.source_id, row.target_id, row.type_id, {}));
        }
        return { nodes: Array.from(nodesMap.values()), edges };
    }
    async findShortestPath(startEntityId, endEntityId) {
        const query = `
      WITH RECURSIVE path_cte AS (
        SELECT 
          target_id as entity_id, 
          ARRAY[source_id, target_id] as path,
          1 as depth
        FROM relationships
        WHERE source_id = $1
        
        UNION ALL
        
        SELECT 
          r.target_id, 
          pc.path || r.target_id,
          pc.depth + 1
        FROM relationships r
        JOIN path_cte pc ON r.source_id = pc.entity_id
        WHERE r.target_id <> ALL(pc.path)
          AND pc.depth < 10
      )
      SELECT path FROM path_cte WHERE entity_id = $2 ORDER BY depth LIMIT 1;
    `;
        const result = await this.db.query(query, [startEntityId, endEntityId]);
        if (result.rows.length === 0)
            return [];
        const entityIds = result.rows[0].path;
        // Note: In a production scenario, we would fetch full node details here.
        return entityIds.map((id) => new GraphEntities_1.GraphNode(id, 'generic', [], {}));
    }
    async saveNode(node) {
        // Graph nodes are projection-based. Persistence is managed by the Entity module.
        return Promise.resolve();
    }
    async findById(entityId) {
        const query = `SELECT id, type, tags FROM entities WHERE id = $1`;
        const result = await this.db.query(query, [entityId]);
        if (result.rows.length === 0)
            return null;
        return new GraphEntities_1.GraphNode(result.rows[0].id, result.rows[0].type, result.rows[0].tags, {});
    }
    async updateNode(entityId, metadata) {
        // Graph nodes are projection-based. Updates are synchronized via Domain Events.
        return Promise.resolve();
    }
    async deleteNode(entityId) {
        const query = `DELETE FROM relationships WHERE source_id = $1 OR target_id = $1`;
        await this.db.query(query, [entityId]);
    }
    async saveEdge(edge) {
        const query = `
      INSERT INTO relationships (id, source_id, target_id, type_id)
      VALUES ($1, $2, $3, $4)
    `;
        const id = (0, crypto_1.randomUUID)();
        await this.db.query(query, [id, edge.sourceEntityId, edge.targetEntityId, edge.relationshipType]);
    }
    async deleteEdge(sourceEntityId, targetEntityId, relationshipType) {
        const query = `DELETE FROM relationships WHERE source_id = $1 AND target_id = $2 AND type_id = $3`;
        await this.db.query(query, [sourceEntityId, targetEntityId, relationshipType]);
    }
    async existsEdge(sourceEntityId, targetEntityId, relationshipType) {
        const query = `SELECT 1 FROM relationships WHERE source_id = $1 AND target_id = $2 AND type_id = $3 LIMIT 1`;
        const result = await this.db.query(query, [sourceEntityId, targetEntityId, relationshipType]);
        return result.rows.length > 0;
    }
    async depthTraversal(entityId, maxDepth) {
        const query = `
      WITH RECURSIVE traversal AS (
        SELECT target_id as node_id, 1 as depth
        FROM relationships WHERE source_id = $1
        UNION ALL
        SELECT r.target_id, t.depth + 1
        FROM relationships r
        JOIN traversal t ON r.source_id = t.node_id
        WHERE t.depth < $2
      )
      SELECT DISTINCT node_id FROM traversal;
    `;
        const result = await this.db.query(query, [entityId, maxDepth]);
        return result.rows.map(row => new GraphEntities_1.GraphNode(row.node_id, 'generic', [], {}));
    }
    async breadthTraversal(entityId, maxDepth) {
        // Breadth traversal in SQL is effectively the same as depth with BFS-like ordered output
        const query = `
      WITH RECURSIVE traversal AS (
        SELECT target_id as node_id, 1 as depth
        FROM relationships WHERE source_id = $1
        UNION ALL
        SELECT r.target_id, t.depth + 1
        FROM relationships r
        JOIN traversal t ON r.source_id = t.node_id
        WHERE t.depth < $2
      )
      SELECT DISTINCT node_id FROM traversal ORDER BY depth;
    `;
        const result = await this.db.query(query, [entityId, maxDepth]);
        return result.rows.map(row => new GraphEntities_1.GraphNode(row.node_id, 'generic', [], {}));
    }
    async findByLabel(label, limit, offset) {
        const query = `SELECT id, type, tags FROM entities WHERE tags @> jsonb_build_array($1) LIMIT $2 OFFSET $3`;
        const result = await this.db.query(query, [label, limit, offset]);
        return result.rows.map(row => new GraphEntities_1.GraphNode(row.id, row.type, row.tags, {}));
    }
    async findByOntologyType(type, limit, offset) {
        const query = `SELECT id, type, tags FROM entities WHERE type = $1 LIMIT $2 OFFSET $3`;
        const result = await this.db.query(query, [type, limit, offset]);
        return result.rows.map(row => new GraphEntities_1.GraphNode(row.id, row.type, row.tags, {}));
    }
    async findEdgesByType(typeId, limit, offset) {
        const query = `SELECT source_id, target_id, type_id FROM relationships WHERE type_id = $1 LIMIT $2 OFFSET $3`;
        const result = await this.db.query(query, [typeId, limit, offset]);
        return result.rows.map(row => new GraphEntities_1.GraphEdge(row.source_id, row.target_id, row.type_id, {}));
    }
    async filterByMetadata(criteria, limit, offset) {
        const query = `SELECT id, type, tags FROM entities WHERE tags @> $1 LIMIT $2 OFFSET $3`;
        const result = await this.db.query(query, [JSON.stringify(criteria), limit, offset]);
        return result.rows.map(row => new GraphEntities_1.GraphNode(row.id, row.type, row.tags, {}));
    }
}
exports.PostgresGraphRepository = PostgresGraphRepository;
//# sourceMappingURL=PostgresGraphRepository.js.map