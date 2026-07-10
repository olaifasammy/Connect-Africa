export type Result<T, E> = Success<T> | Failure<E>;
export declare class Success<T> {
    readonly value: T;
    readonly isSuccess = true;
    readonly isFailure = false;
    constructor(value: T);
}
export declare class Failure<E> {
    readonly error: E;
    readonly isSuccess = false;
    readonly isFailure = true;
    constructor(error: E);
}
