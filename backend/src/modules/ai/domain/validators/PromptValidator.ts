import { Prompt } from '../entities/Prompt';

export interface IPromptValidator {
  validate(prompt: Prompt): boolean;
}

export class PromptValidator implements IPromptValidator {
  validate(prompt: Prompt): boolean {
    return prompt.content.length > 0 && prompt.name.length > 0;
  }
}
