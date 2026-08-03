export type Either<L, R> = Left<L> | Right<R>;

export class Left<L> {
  readonly isLeft = true;
  readonly isRight = false;
  constructor(readonly value: L) {}
}

export class Right<R> {
  readonly isLeft = false;
  readonly isRight = true;
  constructor(readonly value: R) {}
}
