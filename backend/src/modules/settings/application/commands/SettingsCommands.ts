import { ICommand } from '@shared/application/commands/ICommand';

export class CreateSettingsCommand implements ICommand {
  constructor(public readonly userId: string, public readonly theme: string, public readonly timezone: string, public readonly locale: string) {}
}

export class UpdateSettingsCommand implements ICommand {
  constructor(public readonly userId: string, public readonly theme?: string, public readonly timezone?: string, public readonly locale?: string) {}
}

export class UpdateLanguageCommand implements ICommand {
  constructor(public readonly userId: string, public readonly locale: string) {}
}

export class UpdatePrivacyCommand implements ICommand {
  constructor(public readonly userId: string, public readonly level: string) {}
}

export class UpdateNotificationSettingsCommand implements ICommand {
  constructor(public readonly userId: string, public readonly enabled: boolean) {}
}

export class UpdateSecuritySettingsCommand implements ICommand {
  constructor(public readonly userId: string, public readonly mfaEnabled: boolean) {}
}

export class ResetSettingsCommand implements ICommand {
  constructor(public readonly userId: string) {}
}
