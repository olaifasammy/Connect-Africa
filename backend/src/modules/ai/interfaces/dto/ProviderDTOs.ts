import { z } from 'zod';

export const ProviderHealthResponseSchema = z.object({
  providerId: z.string(),
  name: z.string(),
  status: z.enum(['HEALTHY', 'UNHEALTHY']),
});
