import { Redis } from 'ioredis';

const redis = new Redis();
export const PromptCache = redis;
export const AIResponseCache = redis;
export const ProviderCache = redis;
