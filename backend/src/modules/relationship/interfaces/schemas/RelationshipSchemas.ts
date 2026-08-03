import { z } from 'zod';

export const CreateRelationshipSchema = z.object({
  sourceEntityId: z.string().uuid(),
  targetEntityId: z.string().uuid(),
  relationshipTypeId: z.string().uuid(),
});
