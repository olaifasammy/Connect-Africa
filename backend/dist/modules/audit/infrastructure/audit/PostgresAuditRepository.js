"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresAuditRepository = void 0;
class PostgresAuditRepository {
    pool;
    constructor(pool) {
        this.pool = pool;
        console.log('PostgresAuditRepository constructor, pool:', !!this.pool);
    }
    async log(entry) {
        const query = `
      INSERT INTO audit_logs (user_id, action, resource, status, ip_address, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
    `;
        await this.pool.query(query, [entry.user, entry.action, entry.resource, entry.status, entry.ipAddress]);
    }
}
exports.PostgresAuditRepository = PostgresAuditRepository;
//# sourceMappingURL=PostgresAuditRepository.js.map