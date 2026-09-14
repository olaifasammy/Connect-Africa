import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { CreateApiKeyCommand } from '../commands/CreateApiKeyCommand';
import { IApiKeyRepository } from '../../domain/repositories/IApiKeyRepository';
import { Audit } from '@shared/infrastructure/audit/AuditDecorator';

@provide(CreateApiKeyCommandHandler, true)
@injectable()
export class CreateApiKeyCommandHandler {
  constructor(
    @inject('IApiKeyRepository') private readonly apiKeyRepository: IApiKeyRepository
  ) {}

  @Audit('CREATE_API_KEY', 'AUTH')
  async handle(command: CreateApiKeyCommand): Promise<{ id: string; name: string; apiKey: string; prefix: string; scopes: string[] }> {
    const rawKey = `caf_${crypto.randomBytes(32).toString('hex')}`;
    const prefix = rawKey.substring(0, 10);
    const keyHash = await bcrypt.hash(rawKey, 10);

    const id = uuidv4();
    const createdAt = new Date();
    let expiresAt: Date | undefined = undefined;

    if (command.expiresInDays && command.expiresInDays > 0) {
      expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + command.expiresInDays);
    }

    await this.apiKeyRepository.save({
      id,
      userId: command.userId,
      name: command.name,
      prefix,
      keyHash,
      scopes: command.scopes || [],
      isActive: true,
      expiresAt,
      createdAt,
    });

    return {
      id,
      name: command.name,
      apiKey: rawKey, // Returned only once upon creation
      prefix,
      scopes: command.scopes || [],
    };
  }
}
