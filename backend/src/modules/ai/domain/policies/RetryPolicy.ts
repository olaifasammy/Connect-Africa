export interface IRetryPolicy {
  maxRetries: number;
}

export class RetryPolicy implements IRetryPolicy {
  constructor(public readonly maxRetries: number = 3) {}
}
