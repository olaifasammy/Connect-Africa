import { z } from 'zod';
export declare const SendNotificationSchema: z.ZodObject<{
    recipientId: z.ZodString;
    templateId: z.ZodString;
    channel: z.ZodEnum<{
        IN_APP: "IN_APP";
        EMAIL: "EMAIL";
        PUSH: "PUSH";
    }>;
}, z.core.$strip>;
