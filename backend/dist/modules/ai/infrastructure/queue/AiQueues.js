"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetryQueue = exports.AIProcessingQueue = exports.CrawlQueue = void 0;
const bullmq_1 = require("bullmq");
const ioredis_1 = require("ioredis");
const redisConnection = new ioredis_1.Redis();
exports.CrawlQueue = new bullmq_1.Queue('crawl-queue', { connection: redisConnection });
exports.AIProcessingQueue = new bullmq_1.Queue('ai-processing-queue', { connection: redisConnection });
exports.RetryQueue = new bullmq_1.Queue('retry-queue', { connection: redisConnection });
//# sourceMappingURL=AiQueues.js.map