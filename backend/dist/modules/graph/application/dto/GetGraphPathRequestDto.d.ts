import { z } from 'zod';
export declare const GetGraphPathRequestSchema: z.ZodObject<{
    start: z.ZodString;
    end: z.ZodString;
}, z.core.$strip>;
export type GetGraphPathRequestDto = z.infer<typeof GetGraphPathRequestSchema>;
