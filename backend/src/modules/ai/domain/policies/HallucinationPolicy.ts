export interface IHallucinationPolicy {
  threshold: number;
}

export class HallucinationPolicy implements IHallucinationPolicy {
  constructor(public readonly threshold: number = 0.5) {}
}
