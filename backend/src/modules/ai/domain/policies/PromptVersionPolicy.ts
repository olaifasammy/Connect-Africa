import { Prompt } from '../entities/Prompt';

export interface IPromptVersionPolicy {
  isCompatible(prompt: Prompt, version: number): boolean;
}

export class PromptVersionPolicy implements IPromptVersionPolicy {
  isCompatible(prompt: Prompt, version: number): boolean {
    return version <= prompt.version;
  }
}
