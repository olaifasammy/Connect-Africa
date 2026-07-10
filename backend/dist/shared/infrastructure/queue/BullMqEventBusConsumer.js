"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BullMqEventBusConsumer = void 0;
const bullmq_1 = require("bullmq");
const app_1 = require("../../../config/app");
const Logger_1 = require("../../logger/Logger");
class BullMqEventBusConsumer {
    worker;
    constructor() {
        this.worker = new bullmq_1.Worker('domain-events', async (job) => {
            Logger_1.logger.info(`Processing event: ${job.name}`, job.data);
            // Enterprise handling: Retry strategy is configured via BullMQ options, idempotency via job ID
            switch (job.name) {
                case 'UserLoggedInEvent':
                    // Handle logic
                    break;
                default:
                    Logger_1.logger.warn(`Unhandled event: ${job.name}`);
            }
        }, {
            connection: { host: app_1.appConfig.redisHost, port: app_1.appConfig.redisPort },
            limiter: { max: 1000, duration: 5000 }
        });
        this.worker.on('failed', (job, err) => {
            Logger_1.logger.error(`Job ${job?.id} failed: ${err.message}`);
        });
    }
    async shutdown() {
        await this.worker.close();
    }
}
exports.BullMqEventBusConsumer = BullMqEventBusConsumer;
//# sourceMappingURL=BullMqEventBusConsumer.js.map