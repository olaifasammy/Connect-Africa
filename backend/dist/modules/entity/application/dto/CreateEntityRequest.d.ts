import { z } from 'zod';
export declare const CreateEntitySchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    source: z.ZodOptional<z.ZodString>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export type CreateEntityRequest = z.infer<typeof CreateEntitySchema>;
