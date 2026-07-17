import { Prompt } from '../entities/Prompt';

export interface IPromptRepository {
  save(prompt: Prompt): Promise<void>;
  findById(id: string): Promise<Prompt | null>;
  findByName(name: string): Promise<Prompt | null>;
}
