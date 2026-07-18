import { Prompt } from '../../domain/entities/Prompt';
export declare class PromptAuditHelper {
    static logPromptChange(prompt: Prompt, action: 'CREATE' | 'UPDATE' | 'ROLLBACK'): void;
}
