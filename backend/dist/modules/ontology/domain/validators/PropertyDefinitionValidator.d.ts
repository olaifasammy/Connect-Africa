import { BaseError } from '../../../../shared/errors/BaseError';
export declare class PropertyDefinitionValidationError extends BaseError {
    constructor(message: string);
}
export declare class PropertyDefinitionValidator {
    static validate(props: {
        name: string;
        dataType: string;
    }): void;
}
