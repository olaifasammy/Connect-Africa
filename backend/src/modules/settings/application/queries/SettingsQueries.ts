export class GetSettingsQuery {
  constructor(public readonly userId: string) {}
}

export class GetUserSettingsQuery {
  constructor(public readonly userId: string) {}
}

export class GetSystemSettingsQuery {
  constructor() {}
}
