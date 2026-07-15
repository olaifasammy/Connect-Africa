import { z } from 'zod';
export declare const UploadMediaSchema: z.ZodObject<{
    fileName: z.ZodString;
    mimeType: z.ZodString;
}, z.core.$strip>;
