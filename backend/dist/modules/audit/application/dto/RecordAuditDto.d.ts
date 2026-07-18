import { z } from 'zod';
export declare const RecordAuditRequestSchema: z.ZodObject<{
    action: z.ZodString;
    actorId: z.ZodString;
    actorType: z.ZodString;
    ipAddress: z.ZodString;
    userAgent: z.ZodString;
    resourceId: z.ZodString;
    resourceType: z.ZodString;
    metadata: z.ZodOptional<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        value: z.ZodString;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type RecordAuditRequest = z.infer<typeof RecordAuditRequestSchema>;
