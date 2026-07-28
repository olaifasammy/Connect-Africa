import { z } from 'zod';
export const UpdateEntitySchema = z.object({
  description: z.string().optional(),
  source: z.string().optional(),
  tags: z.array(z.string()).optional(),
});
export type UpdateEntityRequest = z.infer<typeof UpdateEntitySchema>;
