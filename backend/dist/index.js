"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = require("./shared/interfaces/http/app");
const app_2 = require("./config/app");
const Logger_1 = require("./shared/logger/Logger");
const BootstrapService_1 = require("./bootstrap/startup/BootstrapService");
const start = async () => {
    await BootstrapService_1.BootstrapService.run();
    const app = (0, app_1.createApp)();
    app.listen(app_2.appConfig.port, () => {
        Logger_1.logger.info(`Server running on port ${app_2.appConfig.port} in ${app_2.appConfig.nodeEnv} mode`);
    });
};
start().catch((err) => {
    Logger_1.logger.error('Failed to start application', err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map