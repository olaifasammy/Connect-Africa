"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCacheProvider = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const CacheProvider_1 = require("./CacheProvider");
const Logger_1 = require("../../logger/Logger");
const app_1 = require("../../../config/app");
class RedisCacheProvider extends CacheProvider_1.CacheProvider {
    client;
    constructor() {
        super();
        this.client = new ioredis_1.default({
            host: app_1.appConfig.redisHost,
            port: app_1.appConfig.redisPort,
        });
        this.client.on('connect', () => {
            Logger_1.logger.info('Connected to Redis');
        });
        this.client.on('error', (err) => {
            Logger_1.logger.error('Redis error', err);
        });
    }
    async get(key) {
        return await this.client.get(key);
    }
    async set(key, value, ttl) {
        if (ttl) {
            await this.client.set(key, value, 'EX', ttl);
        }
        else {
            await this.client.set(key, value);
        }
    }
    async delete(key) {
        await this.client.del(key);
    }
}
exports.RedisCacheProvider = RedisCacheProvider;
//# sourceMappingURL=RedisCacheProvider.js.map