import { BaseError } from '../../../../shared/errors/BaseError';
export declare class EntityTypeValidationError extends BaseError {
    constructor(message: string);
}
export declare class EntityTypeValidator {
    static validate(props: {
        name: string;
        description: string;
    }): void;
}
