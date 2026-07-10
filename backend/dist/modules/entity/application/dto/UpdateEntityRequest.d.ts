import { z } from 'zod';
export declare const UpdateEntitySchema: z.ZodObject<{
    description: z.ZodOptional<z.ZodString>;
    source: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export type UpdateEntityRequest = z.infer<typeof UpdateEntitySchema>;
