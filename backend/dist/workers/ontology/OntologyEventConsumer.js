"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OntologyEventConsumer = void 0;
const bullmq_1 = require("bullmq");
const app_1 = require("../../config/app");
const Logger_1 = require("../../shared/logger/Logger");
class OntologyEventConsumer {
    worker;
    constructor() {
        this.worker = new bullmq_1.Worker('domain-events', async (job) => {
            await this.process(job);
        }, {
            connection: {
                host: app_1.appConfig.redisHost,
                port: app_1.appConfig.redisPort,
            },
        });
    }
    async process(job) {
        if (job.name === 'OntologyCreatedEvent') {
            Logger_1.logger.info('Processing OntologyCreatedEvent', { data: job.data });
            // Implement specific logic for ontology creation event (e.g., notification, indexing)
        }
    }
}
exports.OntologyEventConsumer = OntologyEventConsumer;
//# sourceMappingURL=OntologyEventConsumer.js.map