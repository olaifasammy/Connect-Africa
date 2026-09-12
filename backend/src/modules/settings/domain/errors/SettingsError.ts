import { BaseError } from '@shared/errors/BaseError';

export class SettingsNotFoundError extends BaseError {
  constructor(userId: string) {
    super(`Settings not found for user ${userId}`, 'SETTINGS_NOT_FOUND');
  }
}
