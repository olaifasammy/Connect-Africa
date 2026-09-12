import { Queue, ConnectionOptions } from 'bullmq';
import { Redis } from 'ioredis';

const redisConnection = new Redis({
  lazyConnect: true,
  retryStrategy: () => null,
});
redisConnection.on('error', (err) => {
  console.warn('AI Queues Redis warning:', err.message);
});
export const CrawlQueue = new Queue('crawl-queue', { connection: redisConnection as unknown as ConnectionOptions });
export const AIProcessingQueue = new Queue('ai-processing-queue', { connection: redisConnection as unknown as ConnectionOptions });
export const RetryQueue = new Queue('retry-queue', { connection: redisConnection as unknown as ConnectionOptions });
