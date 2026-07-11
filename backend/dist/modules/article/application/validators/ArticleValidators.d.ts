import { z } from 'zod';
export declare const CreateArticleSchema: z.ZodObject<{
    title: z.ZodString;
    summary: z.ZodString;
    content: z.ZodString;
    authorId: z.ZodString;
}, z.core.$strip>;
export declare const UpdateArticleSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    summary: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
