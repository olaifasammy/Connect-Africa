import { BaseError } from '../../../../shared/errors/BaseError';
export declare class RelationshipTypeValidationError extends BaseError {
    constructor(message: string);
}
export declare class RelationshipTypeValidator {
    static validate(props: {
        name: string;
        description: string;
    }): void;
}
