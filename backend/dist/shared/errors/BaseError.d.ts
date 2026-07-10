export declare abstract class BaseError extends Error {
    readonly message: string;
    readonly code: string;
    constructor(message: string, code: string);
}
