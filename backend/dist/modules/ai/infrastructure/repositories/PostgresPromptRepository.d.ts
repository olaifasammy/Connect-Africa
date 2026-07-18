import { IPromptRepository } from '../../domain/repositories/IPromptRepository';
import { Prompt } from '../../domain/entities/Prompt';
export declare class PostgresPromptRepository implements IPromptRepository {
    save(prompt: Prompt): Promise<void>;
    findById(id: string): Promise<Prompt | null>;
    findByName(name: string): Promise<Prompt | null>;
}
