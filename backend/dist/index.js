"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = require("./shared/interfaces/http/app");
const app_2 = require("./config/app");
const Logger_1 = require("./shared/logger/Logger");
const BootstrapService_1 = require("./bootstrap/startup/BootstrapService");
/**
 * Initializes and starts the application server.
 */
async function bootstrap() {
    try {
        // 1. Run essential startup services (DB connections, migrations, etc.)
        await BootstrapService_1.BootstrapService.run();
        // 2. Initialize the Express/Fastify application instance
        const app = (0, app_1.createApp)();
        // 3. Start listening for incoming traffic
        const { port, nodeEnv } = app_2.appConfig;
        app.listen(port, () => {
            Logger_1.logger.info(`🚀 Server successfully running on port ${port} [Mode: ${nodeEnv}]`);
        });
    }
    catch (error) {
        Logger_1.logger.error('💥 Critical failure during application startup:', error);
        process.exit(1);
    }
}
// Handle unexpected global rejections outside the main lifecycle
process.on('unhandledRejection', (reason) => {
    Logger_1.logger.error('⚠️ Unhandled Promise Rejection detected:', reason);
    process.exit(1);
});
// Execute the bootstrap sequence
void bootstrap();
//# sourceMappingURL=index.js.map