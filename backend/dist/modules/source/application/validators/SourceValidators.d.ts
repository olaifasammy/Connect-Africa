import { z } from 'zod';
import { SourceType } from '../../domain/value-objects/SourceValueObjects';
export declare const CreateSourceSchema: z.ZodObject<{
    title: z.ZodString;
    type: z.ZodEnum<typeof SourceType>;
    author: z.ZodString;
    publishedAt: z.ZodString;
    url: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
