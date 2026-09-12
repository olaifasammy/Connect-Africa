import { z } from 'zod';

export const SearchRequestSchema = z.object({
  query: z.string().min(1),
  page: z.number().int().positive().default(1).optional(),
  limit: z.number().int().positive().max(100).default(10).optional(),
  filters: z.record(z.string(), z.any()).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('asc').optional(),
});
