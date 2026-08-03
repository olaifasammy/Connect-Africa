import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class SearchIndexingService {
  constructor(private readonly postgresProvider: PostgresProvider) {}

  async index(mediaId: UniqueEntityId, metadata: Record<string, any>, tags: string[]): Promise<void> {
    await this.postgresProvider.query(
      'UPDATE media SET metadata = $2 WHERE id = $1',
      [mediaId.toString(), JSON.stringify({ metadata, tags })]
    );
  }
}
