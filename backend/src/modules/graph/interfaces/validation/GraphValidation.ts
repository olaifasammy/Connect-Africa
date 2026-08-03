import { z } from 'zod';

export const CreateGraphNodeSchema = z.object({
  entityId: z.string().uuid(),
  type: z.string().min(1),
  metadata: z.record(z.string(), z.any()),
});

export const CreateGraphEdgeSchema = z.object({
  sourceEntityId: z.string().uuid(),
  targetEntityId: z.string().uuid(),
  relationshipType: z.string().min(1),
  properties: z.record(z.string(), z.any()).optional(),
});
