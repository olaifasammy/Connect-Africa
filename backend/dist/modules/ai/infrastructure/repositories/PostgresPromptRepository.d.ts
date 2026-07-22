import { IPromptRepository } from '../../domain/repositories/IPromptRepository';
import { Prompt } from '../../domain/entities/Prompt';
import { PostgresProvider } from '../../../../shared/infrastructure/database/PostgresProvider';
export declare class PostgresPromptRepository implements IPromptRepository {
    private readonly db;
    constructor(db: PostgresProvider);
    save(prompt: Prompt): Promise<void>;
    findById(id: string): Promise<Prompt | null>;
    findByName(name: string): Promise<Prompt | null>;
}
