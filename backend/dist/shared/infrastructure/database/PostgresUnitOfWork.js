"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresUnitOfWork = void 0;
class PostgresUnitOfWork {
    postgresProvider;
    constructor(postgresProvider) {
        this.postgresProvider = postgresProvider;
    }
    async execute(work) {
        const client = await this.postgresProvider.pool.connect();
        try {
            await client.query('BEGIN');
            const result = await work();
            await client.query('COMMIT');
            return result;
        }
        catch (error) {
            await client.query('ROLLBACK');
            throw error;
        }
        finally {
            client.release();
        }
    }
}
exports.PostgresUnitOfWork = PostgresUnitOfWork;
//# sourceMappingURL=PostgresUnitOfWork.js.map