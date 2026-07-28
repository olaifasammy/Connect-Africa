import { z } from 'zod';

export const SendNotificationSchema = z.object({
  recipientId: z.string().uuid(),
  templateId: z.string().uuid(),
  channel: z.enum(['IN_APP', 'EMAIL', 'PUSH']),
});
