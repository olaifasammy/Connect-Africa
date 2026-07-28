import { z } from 'zod';

export const CreateOntologySchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  version: z.number().int().positive(),
});
