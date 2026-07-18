import { z } from 'zod';
export declare const AIRequestDTOSchema: z.ZodObject<{
    prompt: z.ZodString;
    provider: z.ZodOptional<z.ZodString>;
    context: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.core.$strip>;
export declare const AIResponseDTOSchema: z.ZodObject<{
    content: z.ZodString;
    tokensUsed: z.ZodNumber;
    cost: z.ZodOptional<z.ZodNumber>;
    provider: z.ZodString;
}, z.core.$strip>;
