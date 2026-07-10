import { BaseError } from '../../../../shared/errors/BaseError';
export declare class GraphValidationError extends BaseError {
    constructor(message: string);
}
export declare class InvalidEntityError extends GraphValidationError {
    constructor(entityId: string);
}
