import { BaseError } from '../../../../shared/errors/BaseError';
export declare class InvalidEmailError extends BaseError {
    constructor(email: string);
}
export declare class PasswordTooWeakError extends BaseError {
    constructor();
}
export declare class UserAlreadyExistsError extends BaseError {
    constructor(email: string);
}
