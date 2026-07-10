"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootstrapService = void 0;
const PostgresProvider_1 = require("../../shared/infrastructure/database/PostgresProvider");
const Logger_1 = require("../../shared/logger/Logger");
class BootstrapService {
    static async run() {
        Logger_1.logger.info('Starting application bootstrap...');
        // Initialize Database
        const pgProvider = new PostgresProvider_1.PostgresProvider();
        await pgProvider.connect();
        // Future: Add Redis connection checks, etc.
        Logger_1.logger.info('Application bootstrap completed successfully.');
    }
}
exports.BootstrapService = BootstrapService;
//# sourceMappingURL=BootstrapService.js.map