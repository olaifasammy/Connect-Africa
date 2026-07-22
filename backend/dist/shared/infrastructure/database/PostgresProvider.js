"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresProvider = void 0;
const pg_1 = require("pg");
const Logger_1 = require("../../logger/Logger");
const app_1 = require("../../../config/app");
const DatabaseProvider_1 = require("./DatabaseProvider");
class PostgresProvider extends DatabaseProvider_1.DatabaseProvider {
    _pool;
    constructor() {
        super();
        Logger_1.logger.info('Initializing PostgreSQL connection pool');
        this._pool = new pg_1.Pool({
            connectionString: app_1.appConfig.databaseUrl,
        });
        this._pool.on('error', (err) => {
            Logger_1.logger.error('Unexpected error on idle PostgreSQL client', err);
        });
    }
    get pool() {
        return this._pool;
    }
    async connect() {
        await this.pool.query('SELECT 1');
        Logger_1.logger.info('PostgreSQL connected');
    }
    async disconnect() {
        await this.pool.end();
        Logger_1.logger.info('PostgreSQL disconnected');
    }
    async healthCheck() {
        try {
            await this.pool.query('SELECT 1');
            return true;
        }
        catch (err) {
            Logger_1.logger.error('PostgreSQL health check failed', err);
            return false;
        }
    }
    async query(text, params) {
        return this.pool.query(text, params);
    }
}
exports.PostgresProvider = PostgresProvider;
//# sourceMappingURL=PostgresProvider.js.map