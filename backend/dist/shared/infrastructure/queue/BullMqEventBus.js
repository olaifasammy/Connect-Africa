"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BullMqEventBus = void 0;
const bullmq_1 = require("bullmq");
const app_1 = require("../../../config/app");
class BullMqEventBus {
    queue;
    constructor() {
        this.queue = new bullmq_1.Queue('domain-events', {
            connection: {
                host: app_1.appConfig.redisHost,
                port: app_1.appConfig.redisPort,
            },
        });
    }
    async publish(event) {
        await this.queue.add(event.constructor.name, event);
    }
    async subscribe(event, handler) {
        // Consumer implementation would go here
    }
}
exports.BullMqEventBus = BullMqEventBus;
//# sourceMappingURL=BullMqEventBus.js.map