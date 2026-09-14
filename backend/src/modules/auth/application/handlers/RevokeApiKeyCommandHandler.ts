import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { RevokeApiKeyCommand } from '../commands/RevokeApiKeyCommand';
import { IApiKeyRepository } from '../../domain/repositories/IApiKeyRepository';
import { Audit } from '@shared/infrastructure/audit/AuditDecorator';

@provide(RevokeApiKeyCommandHandler, true)
@injectable()
export class RevokeApiKeyCommandHandler {
  constructor(
    @inject('IApiKeyRepository') private readonly apiKeyRepository: IApiKeyRepository
  ) {}

  @Audit('REVOKE_API_KEY', 'AUTH')
  async handle(command: RevokeApiKeyCommand): Promise<void> {
    const apiKey = await this.apiKeyRepository.findById(command.apiKeyId);
    if (!apiKey || apiKey.userId !== command.userId) {
      throw new Error('API Key not found or unauthorized');
    }

    await this.apiKeyRepository.revoke(command.apiKeyId);
  }
}
