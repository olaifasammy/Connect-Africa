import { Prompt } from '../entities/Prompt';
export interface IPromptValidator {
    validate(prompt: Prompt): boolean;
}
export declare class PromptValidator implements IPromptValidator {
    validate(prompt: Prompt): boolean;
}
