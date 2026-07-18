export interface IRetryPolicy {
    maxRetries: number;
}
export declare class RetryPolicy implements IRetryPolicy {
    readonly maxRetries: number;
    constructor(maxRetries?: number);
}
