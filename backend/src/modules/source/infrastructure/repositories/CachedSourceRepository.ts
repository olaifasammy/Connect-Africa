import { ISourceRepository } from '../../domain/repositories/ISourceRepository';
import { Source } from '../../domain/entities/Source';
import { SourceId } from '../../domain/value-objects/SourceValueObjects';
import { CacheProvider } from '@shared/infrastructure/cache/CacheProvider';

export class CachedSourceRepository implements ISourceRepository {
  constructor(
    private readonly repository: ISourceRepository,
    private readonly cache: CacheProvider,
    private readonly ttl: number = 3600
  ) {}

  async findById(id: SourceId): Promise<Source | null> {
    const cacheKey = `source:id:${id.toString()}`;
    const cached = await this.cache.get(cacheKey);
    if (cached) return JSON.parse(cached); // Note: Simple serialization, needs better mapping

    const source = await this.repository.findById(id);
    if (source) {
      await this.cache.set(cacheKey, JSON.stringify(source), this.ttl);
    }
    return source;
  }

  async save(source: Source): Promise<void> {
    await this.repository.save(source);
    await this.cache.delete(`source:id:${source.id.toString()}`);
  }

  async delete(id: SourceId): Promise<void> {
    await this.repository.delete(id);
    await this.cache.delete(`source:id:${id.toString()}`);
  }
}
