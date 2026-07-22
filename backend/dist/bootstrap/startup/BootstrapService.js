"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootstrapService = void 0;
const PostgresProvider_1 = require("../../shared/infrastructure/database/PostgresProvider");
const Logger_1 = require("../../shared/logger/Logger");
class BootstrapService {
    static pgProvider;
    static async run() {
        Logger_1.logger.info('Starting application bootstrap...');
        // Initialize Database
        this.pgProvider = new PostgresProvider_1.PostgresProvider();
        await this.pgProvider.connect();
        Logger_1.logger.info('Application bootstrap completed successfully.');
    }
    static async shutdown() {
        Logger_1.logger.info('Starting application shutdown...');
        // Close Database
        if (this.pgProvider) {
            await this.pgProvider.disconnect();
        }
        Logger_1.logger.info('Application shutdown completed successfully.');
    }
}
exports.BootstrapService = BootstrapService;
//# sourceMappingURL=BootstrapService.js.map