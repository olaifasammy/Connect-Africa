import { z } from 'zod';

export const GetMetricsSchema = z.object({
  params: z.object({
    context: z.string().min(1),
  }),
});
