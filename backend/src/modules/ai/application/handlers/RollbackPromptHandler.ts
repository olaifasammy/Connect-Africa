import { inject } from 'inversify';
import { provide } from "inversify-binding-decorators";
import { injectable } from "inversify";
import { logger } from '@shared/logger/Logger';
import { RollbackPromptCommand } from '../commands/RollbackPromptCommand';
import { IPromptRepository } from '../../domain/repositories/IPromptRepository';

@provide(RollbackPromptHandler, true)
@injectable()
export class RollbackPromptHandler {
  constructor(
    @inject('IPromptRepository') private readonly promptRepository: IPromptRepository
  ) {}

  async handle(command: RollbackPromptCommand): Promise<void> {
    const prompt = await this.promptRepository.findById(command.promptId);
    if (!prompt) throw new Error('Prompt not found');
    
    // In production, implement rollback logic to specific version
    logger.info(`[PROMPT] Rolling back ${command.promptId} to version ${command.version}`);
  }
}
