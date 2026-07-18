export declare class CostRecord {
    readonly id: string;
    readonly providerId: string;
    readonly amount: number;
    readonly currency: string;
    readonly timestamp: Date;
    constructor(id: string, providerId: string, amount: number, currency: string, timestamp: Date);
}
