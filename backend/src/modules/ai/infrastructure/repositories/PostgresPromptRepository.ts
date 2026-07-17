import { IPromptRepository } from '../../domain/repositories/IPromptRepository';
import { Prompt } from '../../domain/entities/Prompt';

export class PostgresPromptRepository implements IPromptRepository {
  async save(prompt: Prompt): Promise<void> {
    // Production implementation would use the database connection pool
  }

  async findById(id: string): Promise<Prompt | null> {
    return null;
  }

  async findByName(name: string): Promise<Prompt | null> {
    return null;
  }
}
