import { BaseError } from '../../../../shared/errors/BaseError';
export declare class NamespaceValidationError extends BaseError {
    constructor(message: string);
}
export declare class NamespaceValidator {
    static validate(namespace: string): void;
}
