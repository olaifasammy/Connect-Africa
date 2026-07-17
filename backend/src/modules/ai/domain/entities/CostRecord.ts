export class CostRecord {
  constructor(
    public readonly id: string,
    public readonly providerId: string,
    public readonly amount: number,
    public readonly currency: string,
    public readonly timestamp: Date
  ) {}
}
