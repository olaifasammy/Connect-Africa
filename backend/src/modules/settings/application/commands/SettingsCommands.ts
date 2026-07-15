export class CreateSettingsCommand {
  constructor(public readonly userId: string, public readonly theme: string, public readonly timezone: string, public readonly locale: string) {}
}

export class UpdateSettingsCommand {
  constructor(public readonly userId: string, public readonly theme?: string, public readonly timezone?: string, public readonly locale?: string) {}
}

export class UpdateLanguageCommand {
  constructor(public readonly userId: string, public readonly locale: string) {}
}

export class UpdatePrivacyCommand {
  constructor(public readonly userId: string, public readonly level: string) {}
}

export class UpdateNotificationSettingsCommand {
  constructor(public readonly userId: string, public readonly enabled: boolean) {}
}

export class UpdateSecuritySettingsCommand {
  constructor(public readonly userId: string, public readonly mfaEnabled: boolean) {}
}

export class ResetSettingsCommand {
  constructor(public readonly userId: string) {}
}
