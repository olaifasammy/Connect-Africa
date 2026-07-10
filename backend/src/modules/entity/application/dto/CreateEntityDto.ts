import { z } from 'zod';

export const CreateEntitySchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  type: z.string().min(1, 'Type is required'),
  description: z.string().optional(),
  source: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type CreateEntityDto = z.infer<typeof CreateEntitySchema>;
