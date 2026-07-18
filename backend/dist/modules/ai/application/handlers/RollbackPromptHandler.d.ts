import { RollbackPromptCommand } from '../commands/RollbackPromptCommand';
import { IPromptRepository } from '../../domain/repositories/IPromptRepository';
export declare class RollbackPromptHandler {
    private readonly promptRepository;
    constructor(promptRepository: IPromptRepository);
    handle(command: RollbackPromptCommand): Promise<void>;
}
