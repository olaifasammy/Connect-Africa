"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresAuditRepository = void 0;
const AuditValueObjects_1 = require("../../domain/value-objects/AuditValueObjects");
const AuditEntry_1 = require("../../domain/aggregates/AuditEntry");
const AuditValueObjects_2 = require("../../domain/value-objects/AuditValueObjects");
const AuditActor_1 = require("../../domain/entities/AuditActor");
const AuditResource_1 = require("../../domain/entities/AuditResource");
const AuditMetadata_1 = require("../../domain/entities/AuditMetadata");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class PostgresAuditRepository {
    pool;
    constructor(pool) {
        this.pool = pool;
    }
    async log(entry) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            await client.query(`
        INSERT INTO audit_entries (id, correlation_id, actor_id, actor_type, resource_id, resource_type, action, timestamp)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [
                entry.id.toString(),
                entry.correlationId.getProps().value,
                entry.actor.userId.toString(),
                entry.actor.actorType,
                entry.resource.resourceId.toString(),
                entry.resource.type,
                entry.action,
                entry.timestamp.getProps().value
            ]);
            for (const meta of entry.metadata) {
                await client.query('INSERT INTO audit_metadata (id, audit_entry_id, key, value) VALUES ($1, $2, $3, $4)', [meta.id.toString(), entry.id.toString(), meta.key, meta.value]);
            }
            await client.query('COMMIT');
        }
        catch (e) {
            await client.query('ROLLBACK');
            throw e;
        }
        finally {
            client.release();
        }
    }
    async search(criteria) {
        const params = [];
        let query = `
      SELECT e.*, m.id as m_id, m.key, m.value
      FROM audit_entries e
      LEFT JOIN audit_metadata m ON e.id = m.audit_entry_id
      WHERE 1=1
    `;
        if (criteria.userId) {
            params.push(criteria.userId);
            query += ` AND e.actor_id = $${params.length}`;
        }
        if (criteria.resourceId) {
            params.push(criteria.resourceId);
            query += ` AND e.resource_id = $${params.length}`;
        }
        query += ' ORDER BY e.timestamp DESC';
        const result = await this.pool.query(query, params);
        return this.mapRowsToEntries(result.rows);
    }
    async findById(id) {
        const result = await this.pool.query(`
      SELECT e.*, m.id as m_id, m.key, m.value
      FROM audit_entries e
      LEFT JOIN audit_metadata m ON e.id = m.audit_entry_id
      WHERE e.id = $1
    `, [id]);
        if (result.rows.length === 0)
            return null;
        return this.mapRowsToEntries(result.rows)[0];
    }
    mapRowsToEntries(rows) {
        const entriesMap = new Map();
        for (const row of rows) {
            if (!entriesMap.has(row.id)) {
                entriesMap.set(row.id, {
                    id: row.id,
                    correlationId: row.correlation_id,
                    actor: { id: row.actor_id, type: row.actor_type },
                    resource: { id: row.resource_id, type: row.resource_type },
                    action: row.action,
                    timestamp: row.timestamp,
                    metadata: []
                });
            }
            if (row.m_id) {
                entriesMap.get(row.id).metadata.push({
                    id: row.m_id,
                    key: row.key,
                    value: row.value
                });
            }
        }
        return Array.from(entriesMap.values()).map(data => AuditEntry_1.AuditEntry.create({
            action: data.action,
            actor: AuditActor_1.AuditActor.create({
                userId: new AuditValueObjects_1.UserId(data.actor.id),
                actorType: data.actor.type,
                ipAddress: new AuditValueObjects_1.IPAddress('127.0.0.1'),
                userAgent: new AuditValueObjects_1.UserAgent('unknown')
            }),
            resource: AuditResource_1.AuditResource.create({
                id: new AuditValueObjects_1.ResourceId(data.resource.id),
                type: data.resource.type
            }),
            metadata: data.metadata.map((m) => AuditMetadata_1.AuditMetadata.create({ key: m.key, value: m.value }, new UniqueEntityId_1.UniqueEntityId(m.id))),
            correlationId: new AuditValueObjects_2.CorrelationId(data.correlationId),
            timestamp: new AuditValueObjects_2.Timestamp(new Date(data.timestamp))
        }, new AuditValueObjects_2.AuditId(data.id)));
    }
}
exports.PostgresAuditRepository = PostgresAuditRepository;
//# sourceMappingURL=PostgresAuditRepository.js.map