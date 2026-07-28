import { z } from 'zod';
export const CreateEntitySchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  description: z.string().optional(),
  source: z.string().optional(),
  tags: z.array(z.string()).default([]),
});
export type CreateEntityRequest = z.infer<typeof CreateEntitySchema>;
