import { z } from 'zod';

export const GetGraphPathRequestSchema = z.object({
  start: z.string().uuid(),
  end: z.string().uuid(),
});

export type GetGraphPathRequestDto = z.infer<typeof GetGraphPathRequestSchema>;
