import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { ListApiKeysQuery } from '../queries/ListApiKeysQuery';
import { IApiKeyRepository } from '../../domain/repositories/IApiKeyRepository';

@provide(ListApiKeysQueryHandler, true)
@injectable()
export class ListApiKeysQueryHandler {
  constructor(
    @inject('IApiKeyRepository') private readonly apiKeyRepository: IApiKeyRepository
  ) {}

  async handle(query: ListApiKeysQuery): Promise<any[]> {
    const keys = await this.apiKeyRepository.findByUserId(query.userId);
    return keys.map(k => ({
      id: k.id,
      name: k.name,
      prefix: k.prefix,
      scopes: k.scopes,
      isActive: k.isActive,
      expiresAt: k.expiresAt,
      createdAt: k.createdAt,
      lastUsedAt: k.lastUsedAt,
    }));
  }
}
