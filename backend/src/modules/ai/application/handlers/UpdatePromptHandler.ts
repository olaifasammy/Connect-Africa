import { UpdatePromptCommand } from '../commands/UpdatePromptCommand';
import { IPromptRepository } from '../../domain/repositories/IPromptRepository';

export class UpdatePromptHandler {
  constructor(private readonly promptRepository: IPromptRepository) {}

  async handle(command: UpdatePromptCommand): Promise<void> {
    const prompt = await this.promptRepository.findById(command.promptId);
    if (!prompt) throw new Error('Prompt not found');
    
    // In production, implement versioning logic here
    await this.promptRepository.save({ ...prompt, content: command.content });
  }
}
