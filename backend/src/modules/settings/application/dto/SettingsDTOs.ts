export interface CreateSettingsDto {
  userId: string;
  theme: string;
  timezone: string;
  locale: string;
}

export interface UpdateSettingsDto {
  theme?: string;
  timezone?: string;
  locale?: string;
}

export interface ChangeThemeDto {
  theme: string;
}

export interface NotificationSettingsDto {
  enabled: boolean;
}

export interface PrivacySettingsDto {
  level: string;
}

export interface SettingsResponseDto {
  userId: string;
  theme: string;
  timezone: string;
  locale: string;
}

export interface ThemeResponseDto {
  theme: string;
}

export interface PreferenceResponseDto {
  key: string;
  value: string;
}
