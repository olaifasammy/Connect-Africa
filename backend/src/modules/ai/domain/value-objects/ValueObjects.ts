export class PromptId {
  constructor(public readonly value: string) {}
}
export class ProviderId {
  constructor(public readonly value: string) {}
}
export class TokenCount {
  constructor(public readonly value: number) {}
}
export class Cost {
  constructor(public readonly value: number, public readonly currency: string) {}
}
export class ModelName {
  constructor(public readonly value: string) {}
}
export class Temperature {
  constructor(public readonly value: number) {}
}
export class ConfidenceScore {
  constructor(public readonly value: number) {}
}
export class CrawlTarget {
  constructor(public readonly url: string) {}
}
