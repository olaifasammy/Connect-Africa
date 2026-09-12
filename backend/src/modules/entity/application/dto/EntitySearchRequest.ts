import { z } from 'zod';

export const EntitySearchRequestSchema = z
  .object({
    query: z
      .string()
      .trim()
      .min(1, 'Search query is required')
      .max(255, 'Search query cannot exceed 255 characters'),
  })
  .strict();

export type EntitySearchRequest = z.infer<typeof EntitySearchRequestSchema>;