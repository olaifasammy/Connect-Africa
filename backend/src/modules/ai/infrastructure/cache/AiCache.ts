import { Redis } from 'ioredis';

const redis = new Redis({
  lazyConnect: true,
  retryStrategy: () => null,
});
redis.on('error', (err) => {
  console.warn('AI Cache Redis warning:', err.message);
});
export const PromptCache = redis;
export const AIResponseCache = redis;
export const ProviderCache = redis;
