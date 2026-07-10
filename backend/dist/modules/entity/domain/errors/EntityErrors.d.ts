export declare class EntityError extends Error {
    readonly code: string;
    constructor(code: string, message: string);
}
export declare class ValidationError extends EntityError {
    constructor(message: string);
}
export declare class UnauthorizedError extends EntityError {
    constructor(message?: string);
}
