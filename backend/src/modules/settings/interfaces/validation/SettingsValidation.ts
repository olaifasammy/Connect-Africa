import { z } from 'zod';

export const ChangeThemeDtoSchema = z.object({
  theme: z.enum(['light', 'dark']),
});

export const UpdateSettingsDtoSchema = z.object({
  theme: z.enum(['light', 'dark']).optional(),
  timezone: z.string().optional(),
  locale: z.string().optional(),
});
