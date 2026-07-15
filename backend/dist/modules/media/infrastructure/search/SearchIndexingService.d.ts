import { PostgresProvider } from '../../../../shared/infrastructure/database/PostgresProvider';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class SearchIndexingService {
    private readonly postgresProvider;
    constructor(postgresProvider: PostgresProvider);
    index(mediaId: UniqueEntityId, metadata: Record<string, any>, tags: string[]): Promise<void>;
}
