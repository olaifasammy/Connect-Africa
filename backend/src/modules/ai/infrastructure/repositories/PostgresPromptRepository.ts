import { injectable, inject } from 'inversify';
import { IPromptRepository } from '../../domain/repositories/IPromptRepository';
import { Prompt } from '../../domain/entities/Prompt';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';

@injectable()
export class PostgresPromptRepository implements IPromptRepository {
  constructor(@inject('PostgresProvider') private readonly db: PostgresProvider) {}

  async save(prompt: Prompt): Promise<void> {
    await this.db.query(
      'INSERT INTO ai_prompts (id, name, content, version) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO UPDATE SET content = $3, version = $4',
      [prompt.id, prompt.name, prompt.content, prompt.version]
    );
  }

  async findById(id: string): Promise<Prompt | null> {
    const result = await this.db.query('SELECT * FROM ai_prompts WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new Prompt(row.id, row.name, row.content, row.version);
  }

  async findByName(name: string): Promise<Prompt | null> {
    const result = await this.db.query('SELECT * FROM ai_prompts WHERE name = $1 ORDER BY version DESC LIMIT 1', [name]);
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new Prompt(row.id, row.name, row.content, row.version);
  }
}
