import { SearchProvider } from '../../infrastructure/search/SearchProvider';
export declare class RebuildIndexCommand {
    readonly name: string;
    constructor(name: string);
}
export declare class RebuildIndexHandler {
    private readonly provider;
    constructor(provider: SearchProvider);
    handle(command: RebuildIndexCommand): Promise<void>;
}
