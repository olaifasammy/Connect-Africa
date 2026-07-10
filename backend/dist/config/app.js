"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const env_1 = require("./env");
exports.appConfig = {
    port: parseInt(env_1.env.PORT, 10),
    nodeEnv: env_1.env.NODE_ENV,
    databaseUrl: env_1.env.DATABASE_URL,
    redisHost: env_1.env.REDIS_HOST,
    redisPort: parseInt(env_1.env.REDIS_PORT, 10),
    jwt: {
        secret: env_1.env.JWT_SECRET,
        expiration: env_1.env.JWT_EXPIRATION,
    },
};
//# sourceMappingURL=app.js.map