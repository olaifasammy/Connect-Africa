import { z } from 'zod';

export const UploadMediaSchema = z.object({
  fileName: z.string().min(1),
  mimeType: z.string().min(1),
});
