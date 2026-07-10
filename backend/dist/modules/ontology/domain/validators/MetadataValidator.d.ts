import { BaseError } from '../../../../shared/errors/BaseError';
export declare class MetadataValidationError extends BaseError {
    constructor(message: string);
}
export declare class MetadataValidator {
    static validate(props: {
        key: string;
        value: string;
    }): void;
}
