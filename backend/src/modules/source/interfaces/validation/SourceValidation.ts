import { z } from 'zod';

export const CreateSourceSchema = z.object({
  title: z.string().min(1),
  type: z.string().min(1),
  author: z.string().min(1),
  publishedAt: z.string().datetime(),
  url: z.string().url(),
  publisher: z.string().min(1),
});
