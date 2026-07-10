import { BaseError } from '../../../../shared/errors/BaseError';
export declare class OntologyValidationError extends BaseError {
    constructor(message: string);
}
export declare class OntologyValidator {
    static validate(props: {
        name: string;
        description: string;
    }): void;
}
