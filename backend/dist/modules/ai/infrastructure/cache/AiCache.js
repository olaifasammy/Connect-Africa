"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderCache = exports.AIResponseCache = exports.PromptCache = void 0;
const ioredis_1 = require("ioredis");
const redis = new ioredis_1.Redis();
exports.PromptCache = redis;
exports.AIResponseCache = redis;
exports.ProviderCache = redis;
//# sourceMappingURL=AiCache.js.map