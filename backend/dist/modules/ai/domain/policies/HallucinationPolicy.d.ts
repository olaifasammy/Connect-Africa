export interface IHallucinationPolicy {
    threshold: number;
}
export declare class HallucinationPolicy implements IHallucinationPolicy {
    readonly threshold: number;
    constructor(threshold?: number);
}
