export declare class PromptId {
    readonly value: string;
    constructor(value: string);
}
export declare class ProviderId {
    readonly value: string;
    constructor(value: string);
}
export declare class TokenCount {
    readonly value: number;
    constructor(value: number);
}
export declare class Cost {
    readonly value: number;
    readonly currency: string;
    constructor(value: number, currency: string);
}
export declare class ModelName {
    readonly value: string;
    constructor(value: string);
}
export declare class Temperature {
    readonly value: number;
    constructor(value: number);
}
export declare class ConfidenceScore {
    readonly value: number;
    constructor(value: number);
}
export declare class CrawlTarget {
    readonly url: string;
    constructor(url: string);
}
