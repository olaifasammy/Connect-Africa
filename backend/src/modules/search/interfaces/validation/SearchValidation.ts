import { z } from 'zod';

export const SearchRequestSchema = z.object({
  query: z.string().min(1),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
  filters: z.record(z.string(), z.any()).optional(),
  sortBy: z.union([
    z.literal('relevance'),
    z.literal('alphabetical'),
    z.literal('dateCreated'),
    z.literal('dateUpdated'),
    z.literal('popularity')
  ]).optional(),
  sortOrder: z.union([
    z.literal('asc'),
    z.literal('desc')
  ]).optional(),
  includeFacets: z.array(z.string()).optional(),
});
