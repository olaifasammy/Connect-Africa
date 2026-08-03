import { z } from 'zod';

export const SearchQuerySchema = z.object({
  q: z.string().min(1),
  page: z.string().optional(),
  limit: z.string().optional(),
  resourceType: z.string().optional(),
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
});

export const AutocompleteRequestSchema = z.object({
  q: z.string().min(1),
});

export const IndexDocumentSchema = z.object({
  id: z.string().uuid(),
  resourceType: z.string(),
  resourceId: z.string().uuid(),
  content: z.string(),
});

export const BulkIndexSchema = z.array(IndexDocumentSchema);

export const RebuildIndexSchema = z.object({
  name: z.string().min(1),
});

export const GraphSearchSchema = z.object({
  query: z.string().min(1),
  depth: z.number().int().positive().optional(),
});

export const SuggestionRequestSchema = z.object({
  q: z.string().min(1),
});
