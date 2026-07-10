import { CacheProvider } from './CacheProvider';
export declare class RedisCacheProvider extends CacheProvider {
    private client;
    constructor();
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ttl?: number): Promise<void>;
    delete(key: string): Promise<void>;
}
