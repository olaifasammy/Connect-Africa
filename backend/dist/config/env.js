"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    PORT: zod_1.z.string().default('3000'),
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    DATABASE_URL: zod_1.z.string().url(),
    REDIS_HOST: zod_1.z.string().default('localhost'),
    REDIS_PORT: zod_1.z.string().default('6379'),
    JWT_SECRET: zod_1.z.string().min(32),
    JWT_EXPIRATION: zod_1.z.string().default('1h'),
});
const parsedEnv = envSchema.parse(process.env);
exports.env = {
    ...parsedEnv,
    REDIS_URL: `redis://${parsedEnv.REDIS_HOST}:${parsedEnv.REDIS_PORT}`,
};
//# sourceMappingURL=env.js.map