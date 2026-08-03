import { z } from 'zod';

export const ChangeThemeDtoSchema = z.object({
  theme: z.enum(['light', 'dark']),
});

export const UpdateSettingsDtoSchema = z.object({
  theme: z.enum(['light', 'dark']).optional(),
  timezone: z.string().optional(),
  locale: z.string().optional(),
});

export const UpdateLanguageDtoSchema = z.object({
  locale: z.string(),
});

export const UpdatePrivacyDtoSchema = z.object({
  level: z.string(),
});

export const UpdateNotificationSettingsDtoSchema = z.object({
  enabled: z.boolean(),
});

export const UpdateSecuritySettingsDtoSchema = z.object({
  mfaEnabled: z.boolean(),
});

export const ResetSettingsDtoSchema = z.object({});
