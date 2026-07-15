export declare class SearchLogger {
    static logFailedIndexing(docId: string, error: Error): void;
    static logFailedSearch(query: string, error: Error): void;
    static logPerformance(operation: string, durationMs: number): void;
}
