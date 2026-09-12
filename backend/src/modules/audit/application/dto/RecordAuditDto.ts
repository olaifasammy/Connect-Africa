import { z } from 'zod';

export const RecordAuditRequestSchema = z.object({
  action: z.string().min(1),
  actorId: z.string().uuid(),
  actorType: z.string().min(1),
  ipAddress: z.string(),
  userAgent: z.string().min(1),
  resourceId: z.string().uuid(),
  resourceType: z.string().min(1),
  metadata: z.array(z.object({
    key: z.string(),
    value: z.string()
  })).optional()
});

export type RecordAuditRequest = z.infer<typeof RecordAuditRequestSchema>;
