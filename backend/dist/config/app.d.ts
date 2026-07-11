import type { SignOptions } from 'jsonwebtoken';
export declare const appConfig: {
    port: number;
    nodeEnv: "production" | "development" | "test";
    databaseUrl: string;
    redisHost: string;
    redisPort: number;
    jwt: {
        secret: string;
        expiration: SignOptions["expiresIn"];
    };
};
