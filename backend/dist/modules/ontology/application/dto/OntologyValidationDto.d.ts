import { z } from 'zod';
export declare const CreateOntologySchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    version: z.ZodNumber;
}, z.core.$strip>;
