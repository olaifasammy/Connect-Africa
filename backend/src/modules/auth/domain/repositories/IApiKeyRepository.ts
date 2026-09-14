import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export interface ApiKeyRecord {
  id: string;
  userId: string;
  name: string;
  prefix: string;
  keyHash: string;
  scopes: string[];
  isActive: boolean;
  expiresAt?: Date;
  createdAt: Date;
  lastUsedAt?: Date;
}

export interface IApiKeyRepository {
  save(record: ApiKeyRecord): Promise<void>;
  findById(id: string): Promise<ApiKeyRecord | null>;
  findByPrefix(prefix: string): Promise<ApiKeyRecord | null>;
  findByUserId(userId: string): Promise<ApiKeyRecord[]>;
  revoke(id: string): Promise<void>;
  updateLastUsed(id: string): Promise<void>;
}
