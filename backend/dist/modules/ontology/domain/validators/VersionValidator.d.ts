import { BaseError } from '../../../../shared/errors/BaseError';
export declare class VersionValidationError extends BaseError {
    constructor(message: string);
}
export declare class VersionValidator {
    static validate(version: number): void;
}
