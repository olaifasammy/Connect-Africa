import { Pool } from 'pg';
import { IProviderRepository } from '../../domain/repositories/IProviderRepository';
import { Provider } from '../../domain/entities/Provider';

export class PostgresProviderRepository implements IProviderRepository {
  constructor(private readonly db: Pool) {}

  async save(provider: Provider): Promise<void> {
    await this.db.query(
      'INSERT INTO providers (id, name, is_enabled, priority) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, is_enabled = EXCLUDED.is_enabled, priority = EXCLUDED.priority',
      [provider.id, provider.name, provider.isEnabled, provider.priority]
    );
  }

  async findById(id: string): Promise<Provider | null> {
    const result = await this.db.query('SELECT * FROM providers WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new Provider(row.id, row.name, row.is_enabled, row.priority);
  }

  async findAllEnabled(): Promise<Provider[]> {
    const result = await this.db.query('SELECT * FROM providers WHERE is_enabled = true');
    return result.rows.map(row => new Provider(row.id, row.name, row.is_enabled, row.priority));
  }
}
