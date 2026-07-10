export declare abstract class SearchProvider {
    abstract index(id: string, data: any): Promise<void>;
    abstract search(query: string): Promise<string[]>;
}
