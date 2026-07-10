export type Either<L, R> = Left<L> | Right<R>;
export declare class Left<L> {
    readonly value: L;
    readonly isLeft = true;
    readonly isRight = false;
    constructor(value: L);
}
export declare class Right<R> {
    readonly value: R;
    readonly isLeft = false;
    readonly isRight = true;
    constructor(value: R);
}
