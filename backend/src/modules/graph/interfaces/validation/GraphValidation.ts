import { z } from 'zod';

export const GraphNodeQuerySchema = z.object({
  id: z.string().uuid(),
}).strict();

export const GraphSearchQuerySchema = z.object({
  label: z.string().trim().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
}).strict();

export const GraphPathQuerySchema = z.object({
  start: z.string().uuid(),
  end: z.string().uuid(),
}).strict();