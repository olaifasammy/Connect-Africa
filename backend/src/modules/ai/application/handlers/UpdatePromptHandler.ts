import { inject } from 'inversify';
import { provide } from "inversify-binding-decorators";
import { injectable } from "inversify";
import { UpdatePromptCommand } from '../commands/UpdatePromptCommand';
import { IPromptRepository } from '../../domain/repositories/IPromptRepository';

@provide(UpdatePromptHandler, true)
@injectable()
export class UpdatePromptHandler {
  constructor(
    @inject('IPromptRepository') private readonly promptRepository: IPromptRepository
  ) {}

  async handle(command: UpdatePromptCommand): Promise<void> {
    const prompt = await this.promptRepository.findById(command.promptId);
    if (!prompt) throw new Error('Prompt not found');
    
    // In production, implement versioning logic here
    await this.promptRepository.save({ ...prompt, content: command.content });
  }
}
