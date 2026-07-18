import { z } from 'zod';
export declare const ProviderHealthResponseSchema: z.ZodObject<{
    providerId: z.ZodString;
    name: z.ZodString;
    status: z.ZodEnum<{
        HEALTHY: "HEALTHY";
        UNHEALTHY: "UNHEALTHY";
    }>;
}, z.core.$strip>;
