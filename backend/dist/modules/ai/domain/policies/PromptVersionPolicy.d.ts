import { Prompt } from '../entities/Prompt';
export interface IPromptVersionPolicy {
    isCompatible(prompt: Prompt, version: number): boolean;
}
export declare class PromptVersionPolicy implements IPromptVersionPolicy {
    isCompatible(prompt: Prompt, version: number): boolean;
}
