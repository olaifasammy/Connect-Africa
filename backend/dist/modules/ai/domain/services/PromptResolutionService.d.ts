import { PromptVersion } from '../entities/PromptVersion';
export interface IPromptResolutionService {
    resolve(promptId: string, version?: number): Promise<PromptVersion>;
}
