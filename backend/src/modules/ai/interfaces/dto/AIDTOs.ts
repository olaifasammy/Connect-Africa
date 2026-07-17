import { z } from 'zod';

export const AIRequestDTOSchema = z.object({
  prompt: z.string().min(1),
  provider: z.string().optional(),
  context: z.record(z.string(), z.unknown()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const AIResponseDTOSchema = z.object({
  content: z.string(),
  tokensUsed: z.number(),
  cost: z.number().optional(),
  provider: z.string(),
});
