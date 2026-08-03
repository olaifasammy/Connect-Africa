import { z } from 'zod';

export const CreateRelationshipRequestSchema = z.object({
  sourceEntityId: z.string().uuid(),
  targetEntityId: z.string().uuid(),
  relationshipTypeId: z.string().uuid(),
});
