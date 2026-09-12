import { z } from 'zod';

export const StartCrawlSchema = z.object({
  targetUrl: z.string().url(),
});
