import { UpdatePromptCommand } from '../commands/UpdatePromptCommand';
import { IPromptRepository } from '../../domain/repositories/IPromptRepository';
export declare class UpdatePromptHandler {
    private readonly promptRepository;
    constructor(promptRepository: IPromptRepository);
    handle(command: UpdatePromptCommand): Promise<void>;
}
